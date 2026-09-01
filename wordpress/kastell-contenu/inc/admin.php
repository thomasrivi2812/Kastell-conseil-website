<?php
/**
 * Ergonomie de l'administration.
 *
 * L'éditrice ne connaît pas WordPress. Tout ce fichier vise un seul objectif :
 * qu'elle n'ait jamais à deviner. On lui montre les rubriques du site et rien
 * d'autre, chaque écran dit à quoi il sert, et l'ordre d'affichage se règle en
 * déplaçant les lignes plutôt qu'en saisissant des numéros.
 */

defined( 'ABSPATH' ) || exit;

/** Définition complète d'un type, rubrique unique ou liste. */
function kastell_definition( $type ) {
	$tout = kastell_singletons() + kastell_collections();
	return $tout[ $type ] ?? null;
}

/* -------------------------------------------------------------------------
 * Vue d'ensemble
 * ---------------------------------------------------------------------- */

function kastell_page_accueil() {
	$lie = defined( 'KASTELL_SITE_URL' );

	echo '<div class="wrap kastell-accueil">';
	echo '<h1>Contenu du site</h1>';
	echo '<p class="kastell-chapo">Chaque encadré ci-dessous correspond à une partie du site. Modifiez, cliquez sur <strong>Mettre à jour</strong> : le site se met à jour tout seul en moins d’une minute.</p>';

	kastell_bilan_import();
	kastell_bloc_import();

	echo '<h2>Les textes</h2><div class="kastell-cartes">';
	foreach ( kastell_singletons() as $type => $def ) {
		$id = kastell_id_singleton( $type );
		printf(
			'<a class="kastell-carte" href="%s"><strong>%s</strong><span>%s</span></a>',
			esc_url( admin_url( 'post.php?post=' . $id . '&action=edit' ) ),
			esc_html( $def['menu'] ),
			esc_html( $def['aide'] ?? '' )
		);
	}
	echo '</div>';

	echo '<h2>Les listes</h2><div class="kastell-cartes">';
	foreach ( kastell_collections() as $type => $def ) {
		$nombre = (int) wp_count_posts( $type )->publish;
		printf(
			'<a class="kastell-carte" href="%s"><strong>%s <em>(%d)</em></strong><span>%s</span></a>',
			esc_url( admin_url( 'edit.php?post_type=' . $type ) ),
			esc_html( $def['titre'] ),
			$nombre,
			esc_html( $def['aide'] ?? '' )
		);
	}
	echo '</div>';

	echo '<h2>Liaison avec le site</h2>';
	if ( $lie ) {
		printf(
			'<p>Site public : <a href="%1$s" target="_blank" rel="noopener">%1$s</a>.</p>',
			esc_url( KASTELL_SITE_URL )
		);
		$apercu = kastell_lien_apercu();
		if ( $apercu ) {
			printf(
				'<p><a href="%s" class="button button-primary" target="_blank" rel="noopener">Voir l’aperçu du site</a></p>',
				esc_url( $apercu )
			);
			echo '<p class="description">L’aperçu relit WordPress à chaque affichage : vos modifications s’y voient aussitôt. Le site public, lui, se rafraîchit tout seul en moins d’une minute. Ce raccourci reste disponible en haut de chaque écran.</p>';
		}
	} else {
		echo '<p class="kastell-alerte">La constante <code>KASTELL_SITE_URL</code> n’est pas définie dans <code>wp-config.php</code>. Le site fonctionne, mais vos modifications peuvent mettre jusqu’à une minute à s’afficher au lieu d’être immédiates.</p>';
	}
	printf(
		'<p class="description">Vérification technique : <a href="%1$s" target="_blank" rel="noopener">%1$s</a> doit afficher du texte en JSON.</p>',
		esc_url( rest_url( 'kastell/v1/contenu' ) )
	);
	echo '</div>';
}

/**
 * Proposition d'import, tant que rien n'a été saisi.
 *
 * Un back-office vide est indéchiffrable : on ne peut pas modifier un texte
 * qu'on ne voit pas. Le bloc disparaît dès que le contenu est en place.
 */
function kastell_bloc_import() {
	$id      = kastell_id_singleton( 'k_accueil' );
	$amorce  = $id ? get_post_meta( $id, KASTELL_PREFIXE . 'promesse', true ) : '';
	$demande = wp_nonce_url( admin_url( 'admin.php?page=kastell-contenu&kastell_import=1' ), 'kastell_import' );

	if ( '' !== $amorce ) {
		printf(
			'<p class="description">Le contenu est en place. <a href="%s">Compléter les champs restés vides</a> depuis les textes d’origine du site — les saisies existantes ne sont jamais écrasées.</p>',
			esc_url( $demande )
		);
		return;
	}

	echo '<div class="notice notice-info kastell-import"><h2>Commencer ici</h2>';
	echo '<p>Les rubriques sont encore vides. Récupérez les textes actuellement affichés sur le site : vous pourrez ensuite les modifier au lieu de tout saisir.</p>';
	printf( '<p><a href="%s" class="button button-primary button-hero">Récupérer les textes du site</a></p>', esc_url( $demande ) );
	echo '<p class="description">Sans danger : l’opération ne remplit que les champs vides et n’écrase jamais une saisie.</p></div>';
}

/** Compte rendu, au retour de l'import. */
function kastell_bilan_import() {
	$bilan = isset( $_GET['kastell_bilan'] ) ? sanitize_text_field( wp_unslash( $_GET['kastell_bilan'] ) ) : '';
	if ( ! $bilan ) {
		return;
	}
	if ( 'erreur' === $bilan ) {
		echo '<div class="notice notice-error"><p>Import impossible : le fichier <code>contenu-initial.json</code> est introuvable dans l’extension.</p></div>';
		return;
	}
	printf(
		'<div class="notice notice-success"><p>%d champs remplis et %d fiches créées. Vous pouvez maintenant les modifier rubrique par rubrique.</p></div>',
		isset( $_GET['champs'] ) ? (int) $_GET['champs'] : 0,
		isset( $_GET['fiches'] ) ? (int) $_GET['fiches'] : 0
	);
}

/* -------------------------------------------------------------------------
 * Aperçu du site
 * ---------------------------------------------------------------------- */

/**
 * Lien vers l'aperçu, sans exposer le secret.
 *
 * Le site est servi en pages pré-rendues : une modification met jusqu'à une
 * minute à s'y voir. L'aperçu bascule le navigateur en lecture directe. Le
 * secret est ajouté par la redirection, côté serveur, plutôt que d'être écrit
 * dans le HTML de chaque écran d'administration.
 */
function kastell_lien_apercu() {
	if ( ! defined( 'KASTELL_SITE_URL' ) || ! defined( 'KASTELL_SECRET' ) ) {
		return '';
	}
	return wp_nonce_url( admin_url( 'admin-post.php?action=kastell_apercu' ), 'kastell_apercu' );
}

function kastell_rediriger_apercu() {
	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die( 'Droits insuffisants.' );
	}
	check_admin_referer( 'kastell_apercu' );
	if ( ! defined( 'KASTELL_SITE_URL' ) || ! defined( 'KASTELL_SECRET' ) ) {
		wp_die( 'L’aperçu demande KASTELL_SITE_URL et KASTELL_SECRET dans wp-config.php.' );
	}

	$url = add_query_arg(
		'secret',
		rawurlencode( KASTELL_SECRET ),
		rtrim( KASTELL_SITE_URL, '/' ) . '/api/apercu'
	);
	/* Destination hors du site WordPress : wp_safe_redirect la refuserait. */
	wp_redirect( $url, 302 );
	exit;
}
add_action( 'admin_post_kastell_apercu', 'kastell_rediriger_apercu' );

/** Raccourci permanent dans la barre d'administration. */
function kastell_barre_admin( $barre ) {
	if ( ! is_admin() || ! current_user_can( 'edit_posts' ) ) {
		return;
	}
	$lien = kastell_lien_apercu();
	if ( ! $lien ) {
		return;
	}
	$barre->add_node(
		array(
			'id'    => 'kastell-apercu',
			'title' => 'Voir l’aperçu du site',
			'href'  => $lien,
			'meta'  => array( 'target' => '_blank', 'title' => 'Ouvre le site en lecture directe de WordPress' ),
		)
	);
}
add_action( 'admin_bar_menu', 'kastell_barre_admin', 80 );

/* -------------------------------------------------------------------------
 * Écrans d'édition
 * ---------------------------------------------------------------------- */

/** Le champ titre porte le nom de ce qu'il contient vraiment. */
function kastell_placeholder_titre( $texte, $post ) {
	$def = kastell_definition( $post->post_type );
	return $def && ! empty( $def['titre_label'] ) ? $def['titre_label'] : $texte;
}
add_filter( 'enter_title_here', 'kastell_placeholder_titre', 10, 2 );

/** Rappel, en haut de chaque écran, de ce que la rubrique alimente. */
function kastell_aide_en_tete() {
	$ecran = get_current_screen();
	if ( ! $ecran ) {
		return;
	}
	$def = kastell_definition( $ecran->post_type );
	if ( ! $def || empty( $def['aide'] ) ) {
		return;
	}
	printf( '<div class="notice notice-info inline kastell-aide"><p>%s</p></div>', esc_html( $def['aide'] ) );
}
add_action( 'all_admin_notices', 'kastell_aide_en_tete' );

/** Une rubrique unique ne se met pas à la corbeille : le site perdrait sa fiche. */
add_filter( 'map_meta_cap', 'kastell_bloquer_suppression', 10, 4 );

function kastell_bloquer_suppression( $caps, $cap, $user_id, $args ) {
	if ( 'delete_post' !== $cap || empty( $args[0] ) ) {
		return $caps;
	}
	if ( isset( kastell_singletons()[ get_post_type( $args[0] ) ] ) ) {
		return array( 'do_not_allow' );
	}
	return $caps;
}

/* -------------------------------------------------------------------------
 * Listes
 * ---------------------------------------------------------------------- */

/** Colonnes utiles à la place de l'auteur et de la date. */
function kastell_colonnes( $colonnes ) {
	global $typenow;
	$def = kastell_definition( $typenow );
	if ( ! $def || ! isset( $def['liste'] ) ) {
		return $colonnes;
	}

	$nouvelles = array(
		'cb'    => $colonnes['cb'] ?? '',
		'title' => $def['titre_label'] ?? 'Titre',
	);
	foreach ( $def['colonnes'] ?? array() as $cle => $intitule ) {
		$nouvelles[ 'kastell_' . $cle ] = $intitule;
	}
	return $nouvelles;
}
add_filter( 'manage_posts_columns', 'kastell_colonnes' );

function kastell_colonne_contenu( $colonne, $post_id ) {
	if ( 0 !== strpos( $colonne, 'kastell_' ) ) {
		return;
	}
	$cle    = substr( $colonne, strlen( 'kastell_' ) );
	$valeur = get_post_meta( $post_id, KASTELL_PREFIXE . $cle, true );

	if ( '' === $valeur ) {
		echo '<span class="kastell-vide">—</span>';
		return;
	}

	$def   = kastell_definition( get_post_type( $post_id ) );
	$genre = $def['champs'][ $cle ][0] ?? 'texte';

	if ( 'image' === $genre ) {
		printf( '<img src="%s" alt="" class="kastell-vignette" />', esc_url( $valeur ) );
		return;
	}

	echo esc_html( wp_trim_words( $valeur, 14, '…' ) );
}
add_action( 'manage_posts_custom_column', 'kastell_colonne_contenu', 10, 2 );

/** La liste s'affiche dans l'ordre du site, pas par date de création. */
function kastell_ordre_liste( $requete ) {
	if ( ! is_admin() || ! $requete->is_main_query() ) {
		return;
	}
	if ( ! isset( kastell_collections()[ $requete->get( 'post_type' ) ] ) ) {
		return;
	}
	$requete->set( 'orderby', 'menu_order' );
	$requete->set( 'order', 'ASC' );
	$requete->set( 'posts_per_page', 100 );
}
add_action( 'pre_get_posts', 'kastell_ordre_liste' );

/**
 * Tri par glisser-déposer.
 *
 * Le champ « ordre » de WordPress suppose de comprendre qu'un nombre plus petit
 * remonte, et de renuméroter à la main dès qu'on insère un élément. Déplacer la
 * ligne dit la même chose sans rien à comprendre.
 */
function kastell_enregistrer_ordre() {
	check_ajax_referer( 'kastell_ordre', 'nonce' );

	$ids = isset( $_POST['ids'] ) ? array_map( 'absint', (array) $_POST['ids'] ) : array();
	foreach ( $ids as $rang => $id ) {
		if ( ! $id || ! current_user_can( 'edit_post', $id ) ) {
			continue;
		}
		if ( ! isset( kastell_collections()[ get_post_type( $id ) ] ) ) {
			continue;
		}
		wp_update_post( array( 'ID' => $id, 'menu_order' => $rang + 1 ) );
	}
	wp_send_json_success();
}
add_action( 'wp_ajax_kastell_ordre', 'kastell_enregistrer_ordre' );

/* -------------------------------------------------------------------------
 * Nettoyage
 * ---------------------------------------------------------------------- */

/**
 * L'éditrice ne voit que le contenu du site.
 *
 * « Articles » à côté d'« Actualités », « Pages » alors qu'aucune page n'est
 * servie : ces entrées natives n'ont ici aucun sens et ne peuvent que faire
 * saisir du contenu au mauvais endroit. Les administrateurs gardent tout.
 */
function kastell_alleger_le_menu() {
	if ( current_user_can( 'manage_options' ) ) {
		return;
	}
	foreach ( array( 'edit.php', 'edit-comments.php', 'tools.php', 'index.php' ) as $page ) {
		remove_menu_page( $page );
	}
}
add_action( 'admin_menu', 'kastell_alleger_le_menu', 999 );

/** Après connexion, on arrive sur le contenu, pas sur le tableau de bord vide. */
function kastell_redirection_connexion( $url, $demande, $utilisateur ) {
	if ( ! $utilisateur instanceof WP_User || ! $utilisateur->has_cap( 'edit_posts' ) ) {
		return $url;
	}
	if ( $utilisateur->has_cap( 'manage_options' ) ) {
		return $url;
	}
	return admin_url( 'admin.php?page=kastell-contenu' );
}
add_filter( 'login_redirect', 'kastell_redirection_connexion', 10, 3 );

/** Mise en forme et script de tri, sur nos écrans seulement. */
function kastell_admin_assets( $hook ) {
	global $typenow;
	$nos_ecrans = kastell_definition( $typenow ) || 'toplevel_page_kastell-contenu' === $hook;
	if ( ! $nos_ecrans ) {
		return;
	}

	wp_add_inline_style(
		'common',
		'.kastell-chapo{max-width:70ch;font-size:14px}'
		. '.kastell-cartes{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));margin:0 0 34px}'
		. '.kastell-carte{display:block;padding:16px 18px;background:#fff;border:1px solid #dcdcde;border-radius:8px;text-decoration:none;color:#1d2327}'
		. '.kastell-carte:hover{border-color:#2271b1;box-shadow:0 1px 4px rgba(0,0,0,.08)}'
		. '.kastell-carte strong{display:block;margin-bottom:5px;font-size:14px}'
		. '.kastell-carte em{font-style:normal;color:#646970;font-weight:400}'
		. '.kastell-carte span{display:block;color:#50575e;font-size:13px;line-height:1.5}'
		. '.kastell-alerte{padding:10px 14px;background:#fcf9e8;border-left:4px solid #dba617}'
		. '.kastell-aide{margin:14px 0 4px;max-width:80ch}'
		. '.kastell-vignette{max-width:110px;max-height:38px;width:auto;height:auto}'
		. '.kastell-vide{color:#a7aaad}'
		. '.kastell-import{padding:6px 16px 12px;margin:18px 0 26px}'
		. '.kastell-import h2{margin:12px 0 6px}'
		. '.kastell-poignee td{cursor:move}'
		. '.kastell-place{outline:2px dashed #2271b1;outline-offset:-2px}'
	);

	if ( isset( kastell_collections()[ $typenow ] ) && 'edit.php' === $hook ) {
		wp_enqueue_script( 'jquery-ui-sortable' );
		wp_add_inline_script(
			'jquery-ui-sortable',
			'window.kastellOrdre=' . wp_json_encode(
				array(
					'url'   => admin_url( 'admin-ajax.php' ),
					'nonce' => wp_create_nonce( 'kastell_ordre' ),
				)
			) . ';'
			. <<<'JS'
jQuery(function ($) {
  var corps = $('#the-list');
  if (!corps.length || !$.fn.sortable) return;
  corps.addClass('kastell-poignee').sortable({
    items: '> tr',
    axis: 'y',
    cursor: 'move',
    placeholder: 'kastell-place',
    helper: function (e, ligne) {
      /* Sans cela, les cellules perdent leur largeur pendant le déplacement. */
      ligne.children().each(function () { $(this).width($(this).width()); });
      return ligne;
    },
    update: function () {
      var ids = corps.find('> tr').map(function () {
        return (this.id || '').replace('post-', '');
      }).get();
      $.post(window.kastellOrdre.url, {
        action: 'kastell_ordre',
        nonce: window.kastellOrdre.nonce,
        ids: ids
      });
    }
  });
});
JS
		);
	}
}
add_action( 'admin_enqueue_scripts', 'kastell_admin_assets' );

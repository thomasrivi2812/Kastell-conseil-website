<?php
/**
 * Purge du cache du site à chaque publication.
 *
 * WordPress prévient Next, qui vide le cache de la rubrique « contenu ». Sans
 * ce signal, une modification n'apparaîtrait qu'au bout d'une minute — le délai
 * de revalidation du site. Rien de cassé sans lui, seulement plus lent.
 *
 * Les deux constantes se posent dans wp-config.php :
 *   define( 'KASTELL_SITE_URL', 'https://kastell-conseils.fr' );
 *   define( 'KASTELL_SECRET', '…' );  // la même valeur que côté Vercel
 */

defined( 'ABSPATH' ) || exit;

function kastell_types_suivis() {
	return array_merge(
		array_keys( kastell_singletons() ),
		array_keys( kastell_collections() )
	);
}

function kastell_prevenir_le_site( $post_id, $post = null ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( wp_is_post_revision( $post_id ) ) {
		return;
	}

	$type = $post ? $post->post_type : get_post_type( $post_id );
	if ( ! in_array( $type, kastell_types_suivis(), true ) ) {
		return;
	}
	if ( ! defined( 'KASTELL_SITE_URL' ) || ! defined( 'KASTELL_SECRET' ) ) {
		return;
	}

	/* Envoi non bloquant : l'enregistrement d'un article ne doit pas attendre
	   la réponse d'un service tiers, ni échouer si celui-ci est indisponible. */
	wp_remote_post(
		rtrim( KASTELL_SITE_URL, '/' ) . '/api/revalidate',
		array(
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => array(
				'content-type'     => 'application/json',
				'x-kastell-secret' => KASTELL_SECRET,
			),
			'body'     => wp_json_encode( array( 'type' => $type ) ),
		)
	);
}
add_action( 'save_post', 'kastell_prevenir_le_site', 20, 2 );
add_action( 'deleted_post', 'kastell_prevenir_le_site', 20 );

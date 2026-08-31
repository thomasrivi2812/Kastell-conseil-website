<?php
/**
 * Modèle de contenu, déclaré une seule fois.
 *
 * L'administration, l'enregistrement des données et la route REST dérivent tous
 * de cette table : ajouter un champ ici suffit à le voir apparaître dans le
 * back-office et dans la réponse envoyée au site.
 *
 * Types de champs :
 *   texte      une ligne
 *   paragraphe plusieurs lignes
 *   lignes     plusieurs lignes, rendues au site sous forme de liste
 *   image      sélecteur de médiathèque, rendu en URL
 *   fichier    idem, pour un document
 */

defined( 'ABSPATH' ) || exit;

/** Rubriques uniques : une seule fiche chacune, comme un réglage. */
function kastell_singletons() {
	return array(
		'k_parametres' => array(
			'titre'  => 'Paramètres du site',
			'menu'   => 'Paramètres',
			'cle'    => 'parametres',
			'champs' => array(
				'nom'           => array( 'texte', 'Nom du cabinet' ),
				'url'           => array( 'texte', 'Adresse du site', 'Avec https://' ),
				'email'         => array( 'texte', 'Adresse e-mail de contact' ),
				'ville'         => array( 'texte', 'Ville' ),
				'linkedin'      => array( 'texte', 'Page LinkedIn du cabinet' ),
				'linkedinProfil' => array( 'texte', 'Profil LinkedIn de Léa', "C'est ce profil qui alimente la rubrique actualités." ),
				'hatvp'         => array( 'texte', 'Profil HATVP', 'Lien vers la fiche du répertoire des représentants d’intérêts. Laisser vide retire le lien du pied de page.' ),
			),
		),
		'k_accueil' => array(
			'titre'  => 'Page d’accueil',
			'menu'   => 'Accueil',
			'cle'    => 'accueil',
			'champs' => array(
				'promesse'           => array( 'texte', 'Promesse (héros)' ),
				'herosCta'           => array( 'texte', 'Libellé du bouton du héros' ),
				'herosVisuel'        => array( 'image', 'Illustration du héros', 'Laisser vide pour garder le motif cartographique fourni.' ),
				'visionIntitule'     => array( 'texte', 'Notre vision — intitulé de section' ),
				'visionTitre'        => array( 'paragraphe', 'Notre vision — titre' ),
				'visionParagraphes'  => array( 'lignes', 'Notre vision — paragraphes', 'Une ligne vide sépare deux paragraphes.' ),
				'referencesIntitule' => array( 'texte', 'Références — intitulé de section' ),
				'referencesTitre'    => array( 'paragraphe', 'Références — titre' ),
				'actualitesTitre'    => array( 'texte', 'Actualités — titre' ),
				'actualitesCta'      => array( 'texte', 'Actualités — libellé du bouton' ),
				'contactIntitule'    => array( 'texte', 'Contact — intitulé de section' ),
				'contactTitre'       => array( 'paragraphe', 'Contact — titre' ),
				'contactIntro'       => array( 'paragraphe', 'Contact — phrase d’introduction' ),
			),
		),
		'k_offres' => array(
			'titre'  => 'Offres — présentation',
			'menu'   => 'Offres : présentation',
			'cle'    => 'offres',
			'champs' => array(
				'intitule'  => array( 'texte', 'Intitulé de section' ),
				'titrePage' => array( 'paragraphe', 'Titre de la page Offres' ),
				'introPage' => array( 'paragraphe', 'Introduction de la page' ),
			),
		),
		'k_apropos' => array(
			'titre'  => 'À propos',
			'menu'   => 'À propos',
			'cle'    => 'apropos',
			'champs' => array(
				'intitule'                => array( 'texte', 'Intitulé de section' ),
				'nom'                     => array( 'texte', 'Nom' ),
				'role'                    => array( 'texte', 'Fonction' ),
				'portrait'                => array( 'image', 'Portrait' ),
				'biographie'              => array( 'lignes', 'Biographie', 'Une ligne vide sépare deux paragraphes.' ),
				'citation'                => array( 'paragraphe', 'Citation' ),
				'presseIntitule'          => array( 'texte', 'Dans la presse — intitulé du bloc' ),
				'publicationsIntitule'    => array( 'texte', 'Nos publications — intitulé du bloc' ),
				'manifesteIntitule'       => array( 'texte', 'Manifeste — intitulé de section' ),
				'manifesteTitre'          => array( 'paragraphe', 'Manifeste — titre' ),
				'manifesteIntro'          => array( 'paragraphe', 'Manifeste — texte de présentation' ),
				'manifesteObjectifsTitre' => array( 'texte', 'Manifeste — titre de la liste' ),
				'manifesteObjectifs'      => array( 'lignes', 'Manifeste — objectifs', 'Un objectif par ligne. La numérotation est ajoutée automatiquement.' ),
				'manifesteEtiquettes'     => array( 'lignes', 'Manifeste — étiquettes', 'Un mot par ligne, deux ou trois au plus.' ),
				'manifesteCta'            => array( 'texte', 'Manifeste — libellé du bouton' ),
				'manifesteLien'           => array( 'texte', 'Manifeste — lien du bouton' ),
				'manifesteTelechargerCta' => array( 'texte', 'Manifeste — libellé du bouton de téléchargement' ),
				'manifesteFichier'        => array( 'fichier', 'Manifeste — document à télécharger', 'Le PDF. Sans fichier ici ni dans le dépôt, le bouton ne s’affiche pas.' ),
				'manifesteCouverture'     => array( 'image', 'Manifeste — couverture', 'Facultatif : sans image, une couverture est composée aux couleurs du site. Portrait, environ 1000 x 1414 px.' ),
			),
		),
		'k_pied' => array(
			'titre'  => 'Pied de page',
			'menu'   => 'Pied de page',
			'cle'    => 'piedDePage',
			'champs' => array(
				'accroche'  => array( 'paragraphe', 'Phrase de présentation' ),
				'copyright' => array( 'texte', 'Mention de copyright' ),
				'mention'   => array( 'texte', 'Mention réglementaire' ),
			),
		),
	);
}

/**
 * Listes : une fiche par élément, réordonnables par glisser-déposer.
 *
 * `titre_champ` désigne le champ alimenté par le titre WordPress lui-même — on
 * évite ainsi de saisir deux fois la même chose, et la liste du back-office
 * reste lisible.
 */
function kastell_collections() {
	return array(
		'k_offre' => array(
			'titre'       => 'Offres',
			'singulier'   => 'Offre',
			'rubrique'    => 'offres',
			'liste'       => 'liste',
			'titre_champ' => 'titre',
			'champs'      => array(
				'resume'           => array( 'paragraphe', 'Résumé' ),
				'ancre'            => array( 'texte', 'Identifiant de lien', 'Sans accent ni espace. Laisser vide pour le déduire du titre.' ),
				'prestations'      => array( 'lignes', 'Ce que Kastell fait pour vous', 'Une prestation par ligne.' ),
				'note'             => array( 'texte', 'Mention complémentaire', 'Facultatif.' ),
				'casPratiqueTitre' => array( 'texte', 'Cas pratique — titre', 'Facultatif : le bloc n’apparaît que si titre et récit sont remplis.' ),
				'casPratiqueRecit' => array( 'paragraphe', 'Cas pratique — récit' ),
			),
		),
		'k_chiffre' => array(
			'titre'       => 'Chiffres clés',
			'singulier'   => 'Chiffre clé',
			'rubrique'    => 'accueil',
			'liste'       => 'visionChiffres',
			'titre_champ' => 'valeur',
			'champs'      => array( 'libelle' => array( 'texte', 'Légende' ) ),
		),
		'k_client' => array(
			'titre'       => 'Références clients',
			'singulier'   => 'Client',
			'rubrique'    => 'accueil',
			'liste'       => 'clients',
			'titre_champ' => 'nom',
			'champs'      => array( 'logo' => array( 'image', 'Logo' ) ),
		),
		'k_temoignage' => array(
			'titre'       => 'Témoignages',
			'singulier'   => 'Témoignage',
			'rubrique'    => 'accueil',
			'liste'       => 'temoignages',
			'titre_champ' => 'auteur',
			'champs'      => array( 'citation' => array( 'paragraphe', 'Citation' ) ),
		),
		'k_post' => array(
			'titre'       => 'Actualités',
			'singulier'   => 'Actualité',
			'rubrique'    => 'accueil',
			'liste'       => 'posts',
			'titre_champ' => 'date',
			'champs'      => array(
				'extrait' => array( 'paragraphe', 'Extrait' ),
				'lien'    => array( 'texte', 'Lien vers le post' ),
			),
		),
		'k_presse' => array(
			'titre'       => 'Retombées presse',
			'singulier'   => 'Retombée presse',
			'rubrique'    => 'apropos',
			'liste'       => 'presse',
			'titre_champ' => 'titre',
			'champs'      => array(
				'media' => array( 'texte', 'Média' ),
				'lien'  => array( 'texte', 'Lien vers l’article' ),
				'logo'  => array( 'image', 'Logo du média' ),
			),
		),
		'k_publication' => array(
			'titre'       => 'Publications',
			'singulier'   => 'Publication',
			'rubrique'    => 'apropos',
			'liste'       => 'publications',
			'titre_champ' => 'titre',
			'champs'      => array(
				'categorie' => array( 'texte', 'Catégorie', 'Tribune, Manifeste…' ),
				'contexte'  => array( 'paragraphe', 'Contexte' ),
				'lien'      => array( 'texte', 'Lien' ),
				'cta'       => array( 'texte', 'Libellé du lien' ),
				'objectifs' => array( 'lignes', 'Objectifs', 'Facultatif : un objectif par ligne.' ),
			),
		),
	);
}

# Contribuer

OpenFisca est un logiciel libre et les contributeurs sont plus que bienvenus !

N'hésitez pas à *forker* les dépôts de code source sur GitHub et à nous envoyer des *pull-requests*.

Vous pouvez nous joindre par email : contact@openfisca.fr

Merci d'enrichir OpenFisca !

## Pourquoi contribuer à OpenFisca ?

OpenFisca est un projet en cours de développement sous licence GPLv3 ou supérieure. Le code source est librement accessible et modifiable.

Nous invitons les utilisateurs à nous transmettre leur
remarques, les imprécisions ou erreurs identifiées, ainsi
que les éventuelles propositions d'amélioration. Si vous
voulez participer plus activement à l'évolution du
programme, sachez qu'il est possible de contribuer de
multiples façons au projet OpenFisca.

## Utiliser l'API web et orienter son développement

Partager vos utilisations : vous êtes invités à nous
tenir informer des utilisations que vous faîtes de l'API et
notamment des visualisations que vous pourriez
produire. Nous serions ravis de pouvoir les recenser sur le
site d'OpenFisca.

Suggérer des fonctionnalités : n'hésitez pas à nous
faire part des améliorations à apporter à l'API afin qu'elle
puisse répondre au mieux à vos besoins.

Participer directement au
<a href="https://github.com/openfisca/openfisca-web-api">
développement de l'API</a>.

## Tester et rapporter les erreurs

Vous pouvez contribuer au développement d'OpenFisca en
rapportant les erreurs sur le calcul des prestations ou des
impôts que vous constateriez. Afin de permettre aux
développeurs d'OpenFisca de résoudre les problèmes
rapidement, veuillez essayer de suivre la procédure
suivante :

<ol>
   <li> essayer de réaliser un cas-type minimal permettant
     de mettre en évidence l'erreur rencontrée</li>
   <li> vérifier que <a href="https://github.com/openfisca/openfisca-${conf['country']}/issues?state=open"> cette erreur n'est pas déjà répertoriée  </a> ;</li>
   <li> tenter d'identifier la source de l'erreur en
 inspectant <a href="${urls.get_url(ctx, 'variables')}"> les
 formules des différents prestations et impôts</a> ;</li>
   <li> rapporter l'erreur accompagnée éventuellement
           d'informations complémentaires
           sur <a href="https://github.com/openfisca/openfisca-${conf['country']}/issues?state=open">
           la page consacrée sur le site de développement
           collaboratif</a> en fournissant si possible le code
           permettant de reproduire l'erreur ou le fichier json du
           cas type considéré.</li>
</ol>

## Compléter l'implémentation du système socio-fiscal français

Certains pans de la législation ne sont pas encore
intégrés. Étant donné l'ampleur de la tâche, notre
ambition est de constituer une communauté de développeurs,
d'économistes et de spécialistes de la fiscalité ou des
prestations sociales pour maintenir et améliorer le
logiciel.

Vous pouvez y contribuer en suivant les étapes suivantes :

<ol>
    <li> identifier les prestations ou les impôts incomplets
    ou manquants ;</li>
          <li> rassembler la documentation nécessaire à l'écriture
          des formules permettant de les calculer ;</li>
    <li> proposer les correctifs implémentant les
    prestations et les impôts incomplets ou manquants
    sur <a href="https://github.com/openfisca/openfisca-${conf['country']}/">le
    site de développement collaboratif</a>.</li>
</ol>

## Proposer des réformes

OpenFisca permet d'exprimer des réformes et vous pouvez contribuer au projet en implémentant votre propre projet de réforme.

Voir http://doc.openfisca.fr/en/openfisca-in-python/reforms.html

## Autres projets liés à OpenFisca

Vous pouvez également participer à d'autres projets faisant usage d'OpenFisca.
 <ul>
   <li> Le développement des systèmes
   sociaux fiscaux est plus ou mois achevé pour les pays suivants :</li>
     <ul>
 <li> <a href="https://github.com/openfisca/openfisca-france"> France </a></li>
 <li> <a href="https://github.com/openfisca/openfisca-tunisia">
   Tunisie </a></li>
     </ul>
   <li> Il existe de nombreux projets autour d'OpenFisca
   allant d'utilisation d'OpenFisca avec des données
   d'enquêtes à des interfaces utilisateurs utilisant le
   web. Cf <a href="https://github.com/openfisca">https://github.com/openfisca</a>.</li>
   <li> Une utilisation d'OpenFisca à travers <a href="https://github.com/blaquans/ropenfisca">R</a>.</li>
 </ul>
    </p>

## Règles de contribution

Voici quelques règles à suivre pour collaborer à ce projet.

### Messages de commit

Si vous modifiez/créez/supprimez une variable de simulation, veuillez consulter les [règles de rédaction des messages de commit](https://github.com/openfisca/openfisca-france/wiki/Messages-de-commit).

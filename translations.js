// Capachica Turismo — Motor de traducción i18n
const CAPA_TRANSLATE = {
  data: {},
  apply() {
    const lang = (typeof CAPA_NAV !== 'undefined') ? CAPA_NAV.getLang() : (localStorage.getItem('capa_lang') || 'es');
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (this.data[key] && this.data[key][lang]) el.innerHTML = this.data[key][lang];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (this.data[key] && this.data[key][lang]) el.placeholder = this.data[key][lang];
    });
  }
};

const CAPA_I18N = {
  // HOME
  'home.badge':     {es:'Puno · Perú · 3,812 msnm', en:'Puno · Peru · 3,812 masl', fr:'Puno · Pérou · 3 812 m'},
  'home.title1':    {es:'La Joya Escondida', en:'The Hidden Gem', fr:'Le Joyau Caché'},
  'home.title2':    {es:'del Titicaca', en:'of Titicaca', fr:'du Titicaca'},
  'home.sub':       {es:'Capachica es una península mágica donde el tiempo se detiene, las familias abren sus puertas y el lago Titicaca te rodea con su inmensidad azul.', en:'Capachica is a magical peninsula where time stands still, families open their doors and Lake Titicaca surrounds you with its vast blue immensity.', fr:'Capachica est une péninsule magique où le temps s\'arrête, les familles ouvrent leurs portes et le lac Titicaca vous entoure de son immensité bleue.'},
  'home.cta1':      {es:'Explorar Capachica →', en:'Explore Capachica →', fr:'Explorer Capachica →'},
  'home.cta2':      {es:'Turismo Vivencial', en:'Vivencial Tourism', fr:'Tourisme Immersif'},
  'stat.distance':  {es:'de Puno', en:'from Puno', fr:'de Puno'},
  'stat.communities':{es:'Comunidades', en:'Communities', fr:'Communautés'},
  'stat.rating':    {es:'Valoración', en:'Rating', fr:'Évaluation'},
  'stat.altitude':  {es:'Altitud', en:'Altitude', fr:'Altitude'},
  'home.why.tag':   {es:'Por qué Capachica', en:'Why Capachica', fr:'Pourquoi Capachica'},
  'home.why.title': {es:'Un rincón auténtico sin masas de turistas', en:'An authentic corner without tourist crowds', fr:'Un coin authentique sans foules touristiques'},
  'home.why.sub':   {es:'A solo 55km de Puno, Capachica ofrece contacto real con comunidades andinas, paisajes vírgenes del Titicaca y experiencias que cambian perspectivas.', en:'Just 55km from Puno, Capachica offers real contact with Andean communities, pristine Titicaca landscapes and life-changing experiences.', fr:'À seulement 55km de Puno, Capachica offre un contact réel avec les communautés andines, des paysages vierges du Titicaca et des expériences qui changent les perspectives.'},
  'home.feat1.t':   {es:'Turismo Vivencial', en:'Vivencial Tourism', fr:'Tourisme Immersif'},
  'home.feat1.d':   {es:'Vive como una familia local. Come, trabaja y celebra con ellos.', en:'Live like a local family. Eat, work and celebrate with them.', fr:'Vivez comme une famille locale. Mangez, travaillez et célébrez avec eux.'},
  'home.feat2.t':   {es:'Playas del Titicaca', en:'Titicaca Beaches', fr:'Plages du Titicaca'},
  'home.feat2.d':   {es:'Playas tranquilas con vistas panorámicas al lago más alto del mundo.', en:'Peaceful beaches with panoramic views of the world\'s highest lake.', fr:'Plages tranquilles avec des vues panoramiques sur le lac le plus haut du monde.'},
  'home.feat3.t':   {es:'Artesanía Viva', en:'Living Crafts', fr:'Artisanat Vivant'},
  'home.feat3.d':   {es:'Textiles, cerámica y tejidos hechos a mano por artesanas locales.', en:'Textiles, ceramics and weavings handmade by local artisans.', fr:'Textiles, céramiques et tissages faits à la main par des artisanes locales.'},
  'home.feat4.t':   {es:'Aventura Andina', en:'Andean Adventure', fr:'Aventure Andine'},
  'home.feat4.d':   {es:'Ciclismo, kayak, senderismo y pesca artesanal en el Titicaca.', en:'Cycling, kayaking, hiking and artisanal fishing on Titicaca.', fr:'Cyclisme, kayak, randonnée et pêche artisanale sur le Titicaca.'},
  'home.dest.tag':  {es:'Destinos', en:'Destinations', fr:'Destinations'},
  'home.dest.title':{es:'Los rincones más especiales', en:'The most special corners', fr:'Les coins les plus spéciaux'},
  'home.dest.sub':  {es:'Cada rincón de Capachica guarda una historia, una vista y una experiencia única.', en:'Every corner of Capachica holds a story, a view and a unique experience.', fr:'Chaque recoin de Capachica cache une histoire, une vue et une expérience unique.'},
  'home.dest.cta':  {es:'Ver todos los destinos →', en:'See all destinations →', fr:'Voir toutes les destinations →'},
  'card.tag.beach': {es:'Playa', en:'Beach', fr:'Plage'},
  'card.tag.mirador':{es:'Mirador', en:'Viewpoint', fr:'Mirador'},
  'card.tag.island':{es:'Isla', en:'Island', fr:'Île'},
  'card.llachon.t': {es:'Playa de Llachón', en:'Llachón Beach', fr:'Plage de Llachón'},
  'card.llachon.d': {es:'La playa más hermosa de la península, con aguas cristalinas y vistas al lago Titicaca.', en:'The most beautiful beach on the peninsula, with crystal-clear waters and views of Lake Titicaca.', fr:'La plus belle plage de la péninsule, avec des eaux cristallines et des vues sur le lac Titicaca.'},
  'card.amaru.t':   {es:'Mirador del Amaru', en:'Amaru Viewpoint', fr:'Mirador Amaru'},
  'card.amaru.d':   {es:'Vista panorámica de 360° sobre el lago Titicaca y las islas cercanas. Impresionante al amanecer.', en:'360° panoramic view over Lake Titicaca and nearby islands. Breathtaking at sunrise.', fr:'Vue panoramique à 360° sur le lac Titicaca et les îles voisines. Impressionnant au lever du soleil.'},
  'card.ticonata.t':{es:'Isla Ticonata', en:'Ticonata Island', fr:'Île Ticonata'},
  'card.ticonata.d':{es:'Isla sagrada accesible desde Capachica. Comunidad aimara con lodge comunitario.', en:'Sacred island accessible from Capachica. Aymara community with community lodge.', fr:'Île sacrée accessible depuis Capachica. Communauté aymara avec lodge communautaire.'},
  'card.explore':   {es:'Explorar →', en:'Explore →', fr:'Explorer →'},
  'home.vivencial.tag':  {es:'Turismo Vivencial', en:'Vivencial Tourism', fr:'Tourisme Immersif'},
  'home.vivencial.title':{es:'Vive como una familia capachiqueña', en:'Live like a Capachica family', fr:'Vivez comme une famille de Capachica'},
  'home.vivencial.sub':  {es:'No solo visitas Capachica: te conviertes en parte de ella. Comparte el desayuno, la pesca, el tejido y la celebración.', en:'You don\'t just visit Capachica: you become part of it. Share breakfast, fishing, weaving and celebration.', fr:'Vous ne visitez pas seulement Capachica: vous en devenez une partie. Partagez le petit-déjeuner, la pêche, le tissage et la célébration.'},
  'home.v1.t':      {es:'Amanecer en el lago', en:'Sunrise on the lake', fr:'Lever du soleil sur le lac'},
  'home.v1.d':      {es:'Despierta antes del alba y observa cómo el sol tiñe el Titicaca de naranja.', en:'Wake up before dawn and watch the sun paint Titicaca orange.', fr:'Réveillez-vous avant l\'aube et regardez le soleil teindre le Titicaca en orange.'},
  'home.v2.t':      {es:'Pesca artesanal', en:'Artisanal fishing', fr:'Pêche artisanale'},
  'home.v2.d':      {es:'Aprende las técnicas ancestrales de pesca del pueblo aimara en el lago.', en:'Learn the ancestral fishing techniques of the Aymara people on the lake.', fr:'Apprenez les techniques de pêche ancestrales du peuple aymara sur le lac.'},
  'home.v3.t':      {es:'Tejido tradicional', en:'Traditional weaving', fr:'Tissage traditionnel'},
  'home.v3.d':      {es:'Las mujeres de Capachica te enseñan a tejer con lana de alpaca.', en:'The women of Capachica teach you to weave with alpaca wool.', fr:'Les femmes de Capachica vous apprennent à tisser avec de la laine d\'alpaga.'},
  'home.vivencial.cta':  {es:'Conocer el turismo vivencial →', en:'Learn about vivencial tourism →', fr:'En savoir plus sur le tourisme immersif →'},
  'home.reviews.tag':    {es:'Reseñas', en:'Reviews', fr:'Avis'},
  'home.reviews.title':  {es:'Lo que dicen los viajeros', en:'What travellers say', fr:'Ce que disent les voyageurs'},
  'rev1.text':      {es:'"Capachica me cambió la vida. La familia con la que me quedé fue increíblemente generosa. Ver el amanecer sobre el Titicaca fue mágico."', en:'"Capachica changed my life. The family I stayed with was incredibly generous. Watching the sunrise over Titicaca was magical."', fr:'"Capachica a changé ma vie. La famille chez qui je séjournais était incroyablement généreuse. Regarder le lever du soleil sur le Titicaca était magique."'},
  'rev2.text':      {es:'"Genuinamente la experiencia más auténtica que he tenido viajando por Sudamérica. El turismo comunitario aquí está hecho con respeto y es real."', en:'"Genuinely the most authentic experience I\'ve had traveling in South America. The community tourism here is done right — respectful and real."', fr:'"Véritablement l\'expérience la plus authentique que j\'ai vécue en voyageant en Amérique du Sud. Le tourisme communautaire ici est fait correctement."'},
  'rev3.text':      {es:'"Una experiencia profundamente humana. La pesca al amanecer con la familia local quedará grabada en mi memoria para siempre."', en:'"A deeply human experience. Fishing at sunrise with the local family will remain engraved in my memory forever."', fr:'"Une expérience profondément humaine. La pêche au lever du soleil avec la famille locale restera gravée dans ma mémoire pour toujours."'},
  'home.cta.title': {es:'¿Listo para descubrir Capachica?', en:'Ready to discover Capachica?', fr:'Prêt à découvrir Capachica?'},
  'home.cta.sub':   {es:'Planifica tu experiencia vivencial con comunidades locales. Respondemos en menos de 24 horas.', en:'Plan your vivencial experience with local communities. We respond in less than 24 hours.', fr:'Planifiez votre expérience immersive avec les communautés locales. Nous répondons en moins de 24 heures.'},
  'home.cta.btn':   {es:'Planificar mi viaje →', en:'Plan my trip →', fr:'Planifier mon voyage →'},

  // DESTINOS
  'dest.badge':     {es:'Capachica · Puno · Perú', en:'Capachica · Puno · Peru', fr:'Capachica · Puno · Pérou'},
  'dest.title':     {es:'Nuestros Destinos', en:'Our Destinations', fr:'Nos Destinations'},
  'dest.sub':       {es:'Playas, miradores, islas y comunidades que guardan la esencia del Titicaca.', en:'Beaches, viewpoints, islands and communities that hold the essence of Titicaca.', fr:'Plages, belvédères, îles et communautés qui gardent l\'essence du Titicaca.'},
  'dest.sec.tag':   {es:'Lugares imperdibles', en:'Must-see places', fr:'Incontournables'},
  'dest.sec.title': {es:'Descubre la península', en:'Discover the peninsula', fr:'Découvrez la péninsule'},
  'dest.cta.title': {es:'¿Qué destino te llama más?', en:'Which destination calls you most?', fr:'Quelle destination vous attire le plus?'},
  'dest.cta.sub':   {es:'Diseñamos un itinerario personalizado según tus intereses y el tiempo que tienes.', en:'We design a personalised itinerary based on your interests and available time.', fr:'Nous concevons un itinéraire personnalisé selon vos intérêts et le temps disponible.'},
  'dest.cta.btn':   {es:'Diseñar mi itinerario →', en:'Design my itinerary →', fr:'Concevoir mon itinéraire →'},

  // VIVENCIAL
  'viv.badge':      {es:'Experiencia auténtica · Familias locales', en:'Authentic experience · Local families', fr:'Expérience authentique · Familles locales'},
  'viv.title':      {es:'Turismo Vivencial', en:'Vivencial Tourism', fr:'Tourisme Immersif'},
  'viv.sub':        {es:'Más que turismo: una inmersión real en la vida andina de las familias de Capachica.', en:'More than tourism: a real immersion in the Andean life of Capachica\'s families.', fr:'Plus que du tourisme: une immersion réelle dans la vie andine des familles de Capachica.'},
  'viv.what.tag':   {es:'Qué es', en:'What it is', fr:'Ce que c\'est'},
  'viv.what.title': {es:'Eres parte de la familia', en:'You are part of the family', fr:'Vous faites partie de la famille'},
  'viv.what.sub':   {es:'El turismo vivencial de Capachica es diferente. No hay hotel, no hay restaurante estándar. Duermes en la casa de una familia local, comes su comida, trabajas a su lado.', en:'Capachica\'s vivencial tourism is different. No hotel, no standard restaurant. You sleep in a local family\'s home, eat their food, work alongside them.', fr:'Le tourisme immersif de Capachica est différent. Pas d\'hôtel, pas de restaurant standard. Vous dormez dans la maison d\'une famille locale, mangez leur nourriture, travaillez à leurs côtés.'},
  'viv.what.p2':    {es:'Más de 40 familias participan en el programa, todas certificadas y preparadas para recibir viajeros.', en:'Over 40 families participate in the programme, all certified and ready to welcome travellers.', fr:'Plus de 40 familles participent au programme, toutes certifiées et prêtes à accueillir des voyageurs.'},
  'viv.cta':        {es:'Reservar experiencia vivencial →', en:'Book vivencial experience →', fr:'Réserver l\'expérience immersive →'},
  'viv.prog.tag':   {es:'El programa', en:'The programme', fr:'Le programme'},
  'viv.prog.title': {es:'Un día en Capachica', en:'A day in Capachica', fr:'Une journée à Capachica'},
  'tl1.t': {es:'Amanecer sobre el lago', en:'Sunrise over the lake', fr:'Lever du soleil sur le lac'},
  'tl1.d': {es:'Despierta antes del alba y camina hasta la orilla del Titicaca. El silencio y los colores del amanecer son incomparables.', en:'Wake up before dawn and walk to the Titicaca shore. The silence and colours of dawn are incomparable.', fr:'Réveillez-vous avant l\'aube et marchez jusqu\'aux rives du Titicaca. Le silence et les couleurs de l\'aube sont incomparables.'},
  'tl2.t': {es:'Desayuno andino', en:'Andean breakfast', fr:'Petit-déjeuner andin'},
  'tl2.d': {es:'Quinua con leche, pan de horno de barro, queso artesanal y mate de muña.', en:'Quinoa with milk, clay oven bread, artisan cheese and muña herbal tea.', fr:'Quinoa au lait, pain au four en argile, fromage artisanal et tisane de muña.'},
  'tl3.t': {es:'Actividad comunitaria', en:'Community activity', fr:'Activité communautaire'},
  'tl3.d': {es:'Pesca artesanal, siembra de papa y quinua, pastoreo de llamas, o aprendizaje de tejido.', en:'Artisanal fishing, potato and quinoa planting, llama herding, or weaving lessons.', fr:'Pêche artisanale, plantation de pommes de terre et de quinoa, gardiennage de lamas, ou cours de tissage.'},
  'tl4.t': {es:'Almuerzo comunitario', en:'Community lunch', fr:'Déjeuner communautaire'},
  'tl4.d': {es:'Trucha del lago, sopa de chuño, chairo o pachamanca. Comida con ingredientes cultivados por la misma familia.', en:'Lake trout, chuño soup, chairo or pachamanca. Food made with ingredients grown by the same family.', fr:'Truite du lac, soupe de chuño, chairo ou pachamanca. Nourriture préparée avec des ingrédients cultivés par la même famille.'},
  'tl5.t': {es:'Tarde libre o actividad', en:'Free afternoon or activity', fr:'Après-midi libre ou activité'},
  'tl5.d': {es:'Kayak en el lago, visita al mirador del Amaru, paseo por la playa de Llachón o simplemente descansar.', en:'Kayaking on the lake, visiting the Amaru viewpoint, walking on Llachón beach or simply resting.', fr:'Kayak sur le lac, visite du belvédère Amaru, promenade sur la plage de Llachón ou simplement se reposer.'},
  'tl6.t': {es:'Cena y velada cultural', en:'Dinner and cultural evening', fr:'Dîner et soirée culturelle'},
  'tl6.d': {es:'Cena en familia y, si hay festividad, música y danzas andinas. Las estrellas a 3,812m son extraordinarias.', en:'Family dinner and, if there\'s a celebration, Andean music and dances. The stars at 3,812m are extraordinary.', fr:'Dîner en famille et, s\'il y a une fête, musique et danses andines. Les étoiles à 3 812 m sont extraordinaires.'},
  'viv.fam.tag':    {es:'Las familias', en:'The families', fr:'Les familles'},
  'viv.fam.title':  {es:'Conoce a nuestras familias anfitrionas', en:'Meet our host families', fr:'Rencontrez nos familles d\'accueil'},
  'fam1.d': {es:'Pescadores y agricultores de la comunidad de Llachón. Ofrecen pesca artesanal al amanecer.', en:'Fishermen and farmers from the Llachón community. They offer artisanal fishing at dawn.', fr:'Pêcheurs et agriculteurs de la communauté de Llachón. Ils proposent la pêche artisanale à l\'aube.'},
  'fam2.d': {es:'Artesanas especializadas en tejidos de alpaca. Ofrecen talleres de tejido y la mejor vista al lago.', en:'Artisans specialised in alpaca weaving. They offer weaving workshops and the best lake views.', fr:'Artisanes spécialisées dans le tissage d\'alpaga. Elles proposent des ateliers de tissage et la meilleure vue sur le lac.'},
  'fam3.d': {es:'Agricultores orgánicos que cultivan papa nativa, quinua y cañihua. Experiencia de siembra y cosecha.', en:'Organic farmers who grow native potato, quinoa and cañihua. Planting and harvest experience.', fr:'Agriculteurs bio qui cultivent la pomme de terre native, le quinoa et le cañihua. Expérience de semis et de récolte.'},
  'viv.cta.title':  {es:'¿Te unes a una familia capachiqueña?', en:'Join a Capachica family?', fr:'Rejoindre une famille de Capachica?'},
  'viv.cta.sub':    {es:'Mínimo 1 noche. Incluye alojamiento, todas las comidas y las actividades del programa.', en:'Minimum 1 night. Includes accommodation, all meals and programme activities.', fr:'Minimum 1 nuit. Comprend l\'hébergement, tous les repas et les activités du programme.'},
  'viv.cta.btn':    {es:'Reservar experiencia →', en:'Book experience →', fr:'Réserver l\'expérience →'},

  // ACTIVIDADES
  'act.title':      {es:'Actividades & Aventura', en:'Activities & Adventure', fr:'Activités & Aventure'},
  'act.sub':        {es:'Kayak, ciclismo, senderismo, pesca y mucho más en el entorno único del Titicaca.', en:'Kayaking, cycling, hiking, fishing and much more in the unique Titicaca setting.', fr:'Kayak, cyclisme, randonnée, pêche et bien plus encore dans le cadre unique du Titicaca.'},
  'act.sec.title':  {es:'Experiencias únicas en el lago', en:'Unique experiences on the lake', fr:'Expériences uniques sur le lac'},
  'act.kayak.t':    {es:'Kayak en el Titicaca', en:'Kayaking on Titicaca', fr:'Kayak sur le Titicaca'},
  'act.kayak.d':    {es:'Rema entre totorales y llega a playas remotas. Puedes llegar hasta la isla Ticonata en kayak.', en:'Row through totora reeds and reach remote beaches. You can kayak all the way to Ticonata island.', fr:'Ramez entre les roseaux de totora et atteignez des plages isolées. Vous pouvez pagayer jusqu\'à l\'île Ticonata.'},
  'act.bike.t':     {es:'Ciclismo por la Península', en:'Cycling the Peninsula', fr:'Cyclisme sur la Péninsule'},
  'act.bike.d':     {es:'Recorre los 35km de la ruta panorámica con vistas constantes al lago.', en:'Ride the 35km panoramic route with constant lake views.', fr:'Parcourez les 35km de la route panoramique avec des vues constantes sur le lac.'},
  'act.fish.t':     {es:'Pesca Artesanal', en:'Artisanal Fishing', fr:'Pêche Artisanale'},
  'act.fish.d':     {es:'Sal al amanecer con pescadores locales y aprende las técnicas ancestrales.', en:'Head out at dawn with local fishermen and learn ancient techniques.', fr:'Partez à l\'aube avec des pêcheurs locaux et apprenez les techniques ancestrales.'},
  'act.hike.t':     {es:'Senderismo al Mirador', en:'Hiking to the Viewpoint', fr:'Randonnée au Belvédère'},
  'act.hike.d':     {es:'Sube al Mirador del Amaru (4,000m) y contempla el Titicaca en toda su extensión.', en:'Climb to the Amaru Viewpoint (4,000m) and behold Titicaca in all its glory.', fr:'Montez au Mirador Amaru (4 000 m) et contemplez le Titicaca dans toute son étendue.'},
  'act.birds.t':    {es:'Avistamiento de Aves', en:'Birdwatching', fr:'Observation des Oiseaux'},
  'act.birds.d':    {es:'El Titicaca alberga más de 60 especies. Observa flamencos, zambullidores y garzas.', en:'Titicaca is home to over 60 species. Spot flamingos, grebes and herons.', fr:'Le Titicaca abrite plus de 60 espèces. Observez flamants roses, grèbes et hérons.'},
  'act.weave.t':    {es:'Taller de Tejido', en:'Weaving Workshop', fr:'Atelier de Tissage'},
  'act.weave.d':    {es:'Las artesanas de Capachica te enseñan a tejer con lana de alpaca.', en:'Capachica\'s artisans teach you to weave with alpaca wool.', fr:'Les artisanes de Capachica vous apprennent à tisser avec de la laine d\'alpaga.'},
  'act.cta.t':      {es:'Combina varias actividades', en:'Combine several activities', fr:'Combinez plusieurs activités'},
  'act.cta.s':      {es:'Te diseñamos un paquete de 2, 3 o más días con las actividades que más te gusten.', en:'We design a 2, 3 or more day package with your favourite activities.', fr:'Nous concevons un forfait de 2, 3 jours ou plus avec vos activités préférées.'},
  'act.cta.b':      {es:'Diseñar mi itinerario →', en:'Design my itinerary →', fr:'Concevoir mon itinéraire →'},

  // GASTRONOMÍA
  'gast.title':     {es:'Gastronomía Capachiqueña', en:'Capachica Gastronomy', fr:'Gastronomie de Capachica'},
  'gast.sub':       {es:'Ingredientes ancestrales, recetas milenarias y el sabor único del altiplano peruano.', en:'Ancestral ingredients, millennial recipes and the unique flavour of the Peruvian altiplano.', fr:'Ingrédients ancestraux, recettes millénaires et la saveur unique de l\'altiplano péruvien.'},
  'gast.intro.t':   {es:'Cocina de la tierra y el lago', en:'Cuisine of the land and the lake', fr:'Cuisine de la terre et du lac'},
  'gast.intro.s':   {es:'La gastronomía de Capachica combina los productos del lago Titicaca con los cultivos ancestrales del altiplano.', en:'Capachica\'s gastronomy combines Lake Titicaca products with ancestral altiplano crops.', fr:'La gastronomie de Capachica combine les produits du lac Titicaca avec les cultures ancestrales de l\'altiplano.'},

  // FESTIVIDADES
  'fest.title':     {es:'Festividades & Cultura', en:'Festivities & Culture', fr:'Festivités & Culture'},
  'fest.sub':       {es:'Las fiestas de Capachica son una explosión de color, música y devoción andina.', en:'Capachica\'s celebrations are an explosion of colour, music and Andean devotion.', fr:'Les fêtes de Capachica sont une explosion de couleurs, de musique et de dévotion andine.'},

  // ARTESANÍA
  'arte.title':     {es:'Artesanía Capachiqueña', en:'Capachica Crafts', fr:'Artisanat de Capachica'},
  'arte.sub':       {es:'Tejidos de alpaca, cerámica andina y artesanías hechas a mano que guardan siglos de historia.', en:'Alpaca weaving, Andean ceramics and handmade crafts that hold centuries of history.', fr:'Tissage d\'alpaga, céramique andine et artisanat fait main qui gardent des siècles d\'histoire.'},

  // ALOJAMIENTO
  'aloj.title':     {es:'Dónde Dormir', en:'Where to Stay', fr:'Où Dormir'},
  'aloj.sub':       {es:'Desde acogedoras casas de familia hasta lodges con vista al lago Titicaca.', en:'From cosy family homes to lodges overlooking Lake Titicaca.', fr:'De douillettes maisons familiales aux lodges avec vue sur le lac Titicaca.'},

  // CÓMO LLEGAR
  'llegar.title':   {es:'Cómo llegar a Capachica', en:'How to get to Capachica', fr:'Comment arriver à Capachica'},
  'llegar.sub':     {es:'A solo 55km de Puno, Capachica es fácil de alcanzar. Te explicamos todas las rutas.', en:'Just 55km from Puno, Capachica is easy to reach. We explain all the routes.', fr:'À seulement 55km de Puno, Capachica est facile à atteindre. Nous vous expliquons tous les itinéraires.'},

  // CONTACTO
  'contact.title':  {es:'Planifica tu Viaje', en:'Plan your Trip', fr:'Planifiez votre Voyage'},
  'contact.sub':    {es:'Cuéntanos tu sueño y lo hacemos realidad. Respondemos en menos de 24 horas.', en:'Tell us your dream and we\'ll make it happen. We respond in less than 24 hours.', fr:'Partagez votre rêve et nous le réalisons. Nous répondons en moins de 24 heures.'},
  'form.title':     {es:'Cuéntanos tu viaje', en:'Tell us about your trip', fr:'Parlez-nous de votre voyage'},
  'form.name':      {es:'Nombre completo', en:'Full name', fr:'Nom complet'},
  'form.email':     {es:'Email', en:'Email', fr:'Email'},
  'form.when':      {es:'¿Cuándo viajas?', en:'When are you travelling?', fr:'Quand voyagez-vous?'},
  'form.people':    {es:'Número de viajeros', en:'Number of travellers', fr:'Nombre de voyageurs'},
  'form.interest':  {es:'¿Qué te interesa?', en:'What interests you?', fr:'Qu\'est-ce qui vous intéresse?'},
  'form.opt0':      {es:'Selecciona una opción', en:'Select an option', fr:'Sélectionnez une option'},
  'form.opt1':      {es:'Turismo Vivencial con familia', en:'Vivencial tourism with a family', fr:'Tourisme immersif avec une famille'},
  'form.opt2':      {es:'Actividades de aventura', en:'Adventure activities', fr:'Activités d\'aventure'},
  'form.opt3':      {es:'Gastronomía y cultura', en:'Gastronomy and culture', fr:'Gastronomie et culture'},
  'form.opt4':      {es:'Festividades y danzas', en:'Festivities and dances', fr:'Festivités et danses'},
  'form.opt5':      {es:'Tour completo Capachica', en:'Complete Capachica tour', fr:'Tour complet de Capachica'},
  'form.msg':       {es:'Mensaje', en:'Message', fr:'Message'},
  'form.msg.ph':    {es:'Cuéntanos tu sueño de viaje...', en:'Tell us about your dream trip...', fr:'Parlez-nous de votre voyage de rêve...'},
  'form.submit':    {es:'Enviar consulta →', en:'Send enquiry →', fr:'Envoyer la demande →'},
  'form.thanks.t':  {es:'¡Gracias por escribirnos!', en:'Thank you for writing to us!', fr:'Merci de nous avoir écrit!'},
  'form.thanks.s':  {es:'Te respondemos en menos de 24 horas. Mientras tanto, explora más de Capachica.', en:'We\'ll reply within 24 hours. Meanwhile, explore more of Capachica.', fr:'Nous vous répondrons dans les 24 heures. En attendant, explorez davantage Capachica.'},
};



// Auto-attach when script loads

// Assign translations to engine
CAPA_TRANSLATE.data = CAPA_I18N;

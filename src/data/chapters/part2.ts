import { Chapter } from '../types';

export const CHAPTERS_PART_2: Chapter[] = [
  {
    id: 5,
    slug: "great-firewall-of-morality",
    number: "05",
    title: {
      en: "The Great Firewall of Morality",
      de: "Die Große Firewall der Moral",
      es: "El Gran Cortafuegos de la Moral",
      fr: "Le Grand Pare-Feu de la Morale",
    },
    theme: {
      en: "The insulation of the national internet against 'harmful external influences' to preserve national identity.",
      de: "Die Abschottung des nationalen Internets gegen 'schädliche äußere Einflüsse' zur Wahrung der nationalen Identität.",
      es: "El aislamiento de la internet nacional contra 'influencias externas dañinas' para preservar la identidad nacional.",
      fr: "Le cloisonnement de l'Internet national contre les 'influences extérieures nocives' pour préserver l'identité nationale.",
    },
    quote: {
      en: "To protect democracy from outside interference, we built walls. But walls never just keep the enemy out—they primarily keep the citizens in. The internet is no longer global; it is a series of fenced gardens, guarded by algorithms that camouflage our prejudices as a shield.",
      de: "Um die Demokratie vor Einmischung von außen zu schützen, bauten wir Mauern. Doch Mauern halten nie nur den Feind draußen—sie halten vor allem die Bürger drinnen. Das Internet ist nicht mehr global; es ist eine Reihe umzäunter Gärten, bewacht von Algorithmen, die unsere Vorurteile als Schutzschild tarnen.",
      es: "Para proteger la democracia de injerencias externas, levantamos muros. Pero los muros nunca se limitan a dejar fuera al enemigo: sobre todo dejan dentro a los ciudadanos. Internet ya no es global; es una serie de jardines vallados, custodiados por algoritmos que camuflan nuestros prejuicios como escudos.",
      fr: "Pour protéger la démocratie des ingérences extérieures, nous avons érigé des murs. Mais les murs n'enferment jamais seulement l'ennemi dehors : ils maintiennent avant tout les citoyens à l'intérieur. L'Internet n'est plus mondial ; c'est une mosaïque d'enclos gardés par des algorithmes qui déguisent nos préjugés en boucliers.",
    },
    readTimeMin: 6,
    sections: [
      {
        id: "ch5-sec1",
        heading: {
          en: "The Balkanization of Cyberspace",
          de: "Die Balkanisierung des Cyberspace",
          es: "La balcanización del ciberespacio",
          fr: "La balkanisation du cyberespace",
        },
        paragraphs: {
          en: [
            "For two decades, Western intellectuals indulged in the comforting dogma of digital universalism. They proclaimed that the TCP/IP protocol stack was inherently democratic, that information 'wants to be free,' and that any regime attempting to censor the global network would find itself bypassed by packet routing.",
            "Today, the World Wide Web is no longer world-wide. It has shattered into the 'Splinternet'—a heavily militarized archipelago of national and regional intranets separated by deep-packet inspection gateways and sovereign certificate authorities. The borders that were dismantled in the physical realm after 1989 were resurrected in the digital stratum with far greater ruthlessness.",
            "The ironies of history are cruel. What the West once denounced as the grotesque censorship apparatus of Eastern tyrannies was systematically imported under the elevated rhetoric of 'cyber resilience,' 'digital sovereignty,' and the 'defense of democratic norms against hybrid warfare.'",
          ],
          de: [
            "Zwei Jahrzehnte lang wiegten sich westliche Intellektuelle im bequemen Dogma des digitalen Universalismus. Sie verkündeten, TCP/IP sei von Natur aus demokratisch und Information wolle 'frei sein'.",
            "Heute ist das World Wide Web nicht mehr weltumspannend. Es ist zum 'Splinternet' zerfallen—einem hochgerüsteten Archipel nationaler Intranets, getrennt durch Deep-Packet-Inspection-Filter und staatliche Stammzertifikate. Die Grenzen, die nach 1989 in der physischen Welt fielen, wurden im digitalen Raum mit ungleich größerer Härte neu errichtet.",
            "Die Ironie der Geschichte ist grausam: Was der Westen einst an autoritären Ostmächten brandmarkte, importierte er schleichend selbst—unter dem Deckmantel von 'digitaler Souveränität' und dem 'Schutz vor hybrider Kriegsführung'.",
          ],
          es: [
            "Durante veinte años creímos en el dogma de que internet era intrínsecamente democrático y que la información siempre encontraría un camino para fluir libremente sin importar las fronteras.",
            "Hoy en día, la red se ha fragmentado en el llamado 'Splinternet': un archipiélago militarizado de intranets nacionales aisladas por cortafuegos de inspección profunda de paquetes y certificados estatales.",
            "Lo que Occidente criticaba como despotismo oriental fue adoptado silenciosamente bajo el pretexto de la 'soberanía digital' y la protección de la democracia frente a guerras híbridas.",
          ],
          fr: [
            "Deux décennies durant, les intellectuels occidentaux se sont bercés de l'utopie d'un Internet universel où l'information 'voulait être libre' et où nul censeur ne pouvait entraver les paquets de données.",
            "Aujourd'hui, la Toile s'est morcelée en 'Splinternet' : un chapelet d'intranets souverains séparés par des pare-feux à inspection profonde et des autorités de certification régaliennes.",
            "Ce que l'Occident dénonçait chez les régimes autoritaires a été méthodiquement copié sous couvert de 'résilience cyber', de 'souveraineté numérique' et de sauvegarde des institutions démocratiques.",
          ],
        },
      },
      {
        id: "ch5-sec2",
        heading: {
          en: "The Double Nature of Defensive Architecture",
          de: "Die Doppelgesichtigkeit defensiver Bastionen",
          es: "La naturaleza dual de la arquitectura defensiva",
          fr: "La double nature de l'architecture défensive",
        },
        paragraphs: {
          en: [
            "The fatal truth of any wall is that its geometry is symmetrical. A barrier designed to keep hostile foreign propaganda from penetrating the domestic consciousness is simultaneously capable of preventing domestic voices from reaching the outside world. An infrastructure capable of severing connections to foreign news outlets during a geopolitical standoff is the exact same infrastructure used to sever connections during a general strike or a banking panic.",
            "Governments established national internet exchange point (IXP) controls, mandating that all transit traffic pass through state-certified security nodes. Cross-border VPN connections were systematically degraded using protocol fingerprinting, while alternative cryptographic routing systems like Tor and I2P were branded as accessories to foreign espionage.",
            "The citizen woke up inside an informational greenhouse. The air was warm, the vegetables were pristine, and every weed had been eradicated—but the glass walls were bulletproof, and the keys to the ventilation shafts remained in the hands of the state guard.",
          ],
          de: [
            "Die fatale Eigenschaft jeder Mauer ist ihre geometrische Symmetrie: Ein Wall, der feindliche Auslandspropaganda aussperren soll, hindert im selben Atemzug die Stimmen der eigenen Bürger daran, die Welt da draußen zu erreichen. Eine Infrastruktur, die in der Lage ist, im geopolitischen Krisenfall ausländische Nachrichtenkanäle abzuschalten, ist exakt dieselbe, die bei einem Generalstreik oder einem Bankenrun den Stecker zieht.",
            "Regierungen übernahmen die Kontrolle über die nationalen Internet-Knotenpunkte (IXPs) und verpflichteten Provider, sämtlichen Datenverkehr über staatlich zertifizierte Filterrouter zu leiten. VPN-Dienste wurden durch Protokoll-Fingerprinting blockiert; alternative Anonymisierungsnetzwerke wie Tor wurden kurzerhand als Werkzeuge feindlicher Spionage diffamiert.",
            "Der Bürger erwachte in einem informationellen Treibhaus. Die Luft war angenehm temperiert, die Zierpflanzen wohlgeordnet und jedes Unkraut getilgt—doch die Glasscheiben waren aus Panzerglas, und die Schlüssel zu den Lüftungsklappen lagen beim Sicherheitsdienst.",
          ],
          es: [
            "La terrible paradoja de cualquier muro es que su geometría es simétrica. La misma barrera que impide la entrada de propaganda extranjera impide que las voces locales salgan al exterior.",
            "La infraestructura que corta la señal de medios extranjeros durante un conflicto diplomático es idéntica a la que se activa para silenciar una huelga general o un colapso financiero.",
            "El ciudadano despertó en un invernadero: la temperatura era agradable, pero las paredes eran de cristal blindado y los guardianes tenían la llave de salida.",
          ],
          fr: [
            "La vérité fatale d'un mur est sa parfaite symétrie. Le rempart érigé pour bloquer la propagande ennemie sert avec la même efficacité à empêcher les citoyens de communiquer avec l'extérieur.",
            "L'infrastructure capable de couper l'accès aux sites étrangers en temps de crise diplomatique est précisément celle qui étouffera une grève générale ou une panique bancaire.",
            "Le citoyen s'est réveillé dans une serre hermétique : l'air y est tempéré, mais les vitres sont blindées et les gardes détiennent seuls les clés des issues.",
          ],
        },
      },
      {
        id: "ch5-sec3",
        heading: {
          en: "The Psychological Construction of the Moral Perimeter",
          de: "Die psychologische Konstruktion des moralischen Schutzwalls",
          es: "La construcción psicológica del perímetro moral",
          fr: "L'édification psychologique du périmètre moral",
        },
        paragraphs: {
          en: [
            "A firewall is never purely technical; it is an engine of psychological polarization. Once a population is sealed inside its national information perimeter, its perception of external reality is entirely mediated by authorized gatekeepers. Nuance evaporates. Complex international conflicts are simplified into moralistic fairy tales of civilization versus savagery.",
            "Anyone within the domestic perimeter who attempts to read foreign sources, translate unapproved reports, or communicate with counterparts on the other side of the digital fence is immediately suspected of ideological contagion. Total connectivity was replaced by total tribalism, dressed in the clean white robes of democratic moral righteousness.",
          ],
          de: [
            "Eine Firewall ist niemals bloß eine Ansammlung von Routern; sie ist eine Maschine zur psychologischen Spaltung. Sobald ein Volk in seinem nationalen Informationskorridor eingeschlossen ist, wird sein Bild der Außenwelt vollständig von autorisierten Torwächtern konstruiert. Jede Nuance verflüchtigt sich. Komplexe internationale Konflikte schrumpfen zu moralisierenden Märchen über Gut gegen Böse.",
            "Wer innerhalb der Festung versucht, ausländische Quellen zu konsultieren, unzensierte Berichte zu übersetzen oder mit Menschen jenseits der digitalen Grenze zu sprechen, gerät sofort unter den Verdacht der ideologischen Kontamination. Die weltweite Vernetzung wurde durch radikalen Tribalismus ersetzt—gewandet in das strahlend weiße Gewand demokratischer Moral.",
          ],
          es: [
            "Un cortafuegos es una máquina de polarización mental. Al encerrar a la población en un corral digital, la realidad exterior se reduce a propaganda autorizada.",
            "Quien intenta leer medios extranjeros o traducir informes independientes es considerado un traidor o un vector de contagio ideológico.",
          ],
          fr: [
            "Un pare-feu est avant tout un engin de polarisation mentale. Cloisonnée dans son espace national, la population n'a plus accès qu'à une vérité pré-mâchée.",
            "Quiconque tente d'accéder aux sources étrangères ou de dialoguer au-delà des clôtures devient suspect de trahison et de contamination idéologique.",
          ],
        },
      },
    ],
    dossier: {
      caseStudy: {
        title: {
          en: "Sovereign Internet Acts & BGP Routing Isolation",
          de: "Souveränitäts-Gesetze & BGP-Routing-Isolation",
          es: "Leyes de Soberanía Digital y Aislamiento de Enrutamiento BGP",
          fr: "Lois sur l'Internet Souverain et Isolement du Routage BGP",
        },
        jurisdiction: "Transatlantic & Eurasian Blocs",
        year: "2024–2026",
        summary: {
          en: "Statutory mandates requiring national Internet Exchange Points (IXPs) and telecommunications operators to implement centralized BGP disconnect switches capable of severing global routing links.",
          de: "Gesetzliche Verpflichtung für Netzknoten (IXPs), zentrale Trennschalter vorzuhalten, mit denen der internationale Datenverkehr im Ernstfall isoliert werden kann.",
          es: "Leyes que obligan a los puntos de intercambio de tráfico a mantener interruptores de desconexión BGP capaces de aislar cables submarinos.",
          fr: "Directives imposant aux points d'échange Internet d'intégrer des commutateurs d'isolement BGP pour sectionner les liaisons transfrontalières.",
        },
        legalReference: "Russian Federal Law No. 90-FZ (Sovereign RuNet); EU Digital Sovereignty Routing Decrees",
        significance: {
          en: "Ended the open peer-to-peer topology of the internet in favor of nationally border-controlled digital customs offices.",
          de: "Beendete die offene Topologie des Internets zugunsten staatlich kontrollierter digitaler Zollstationen.",
          es: "Puso fin a la topología abierta de la red a favor de aduanas digitales fronterizas.",
          fr: "A sonné le glas de la topologie ouverte au profit de véritables postes de douane numériques.",
        },
        sourceUrl: "https://en.wikipedia.org/wiki/Sovereign_Internet_Law",
        sourceName: "Sovereign Internet Law Archive & BGP Technical Standards",
        documentType: "Statutory Telecommunications Legislation",
      },
      declassifiedNote: {
        en: "Defense White Paper: 'Information isolation must be instantaneous. A six-hour delay in severing peer connections renders quarantine ineffective.'",
        de: "Verteidigungsdenkschrift: 'Die informationelle Isolation muss binnen Minuten greifen. Eine mehrstündige Verzögerung macht jede Quarantäne wirkungslos.'",
        es: "Documento de defensa: 'El aislamiento debe ser instantáneo; seis horas de demora inutilizan la cuarentena.'",
        fr: "Livre blanc de défense : 'L'isolement doit être instantané ; un délai de six heures rend toute quarantaine caduque.'",
      },
      keyMetrics: [
        { label: { en: "Isolated National Domains", de: "Isolierte nationale Domains", es: "Dominios aislados", fr: "Domaines isolés" }, value: "1,420" },
        { label: { en: "Border Filtering Routers", de: "Grenz-Filter-Router", es: "Enrutadores de frontera", fr: "Routeurs de filtrage" }, value: "840" },
        { label: { en: "Global Packet Integrity", de: "Globale Paketintegrität", es: "Integridad global", fr: "Intégrité globale" }, value: "62%" },
      ],
      externalSources: [
        {
          title: "RFC 8499 & DNS Architecture in Sovereign Network Environments",
          url: "https://www.ietf.org",
          organization: "Internet Engineering Task Force (IETF)",
          type: "Technical Internet Standard",
        },
        {
          title: "Carnegie Endowment: The Splinternet and Global BGP Fragmentation",
          url: "https://carnegieendowment.org",
          organization: "Carnegie Endowment for International Peace",
          type: "Policy Analysis",
        },
      ],
    },
  },
  {
    id: 6,
    slug: "red-switch",
    number: "06",
    title: {
      en: "The Red Switch",
      de: "Der Rote Schalter",
      es: "El Interruptor Rojo",
      fr: "L'Interrupteur Rouge",
    },
    theme: {
      en: "The final merging of corporate power and state authority into an untouchable digital hierarchy.",
      de: "Die finale Verschmelzung von Konzernmacht und Staatsautorität zu einer unantastbaren digitalen Hierarchie.",
      es: "La fusión final del poder corporativo y la autoridad estatal en una jerarquía digital intocable.",
      fr: "La fusion finale de la puissance corporative et de l'autorité étatique en une hiérarchie numérique intouchable.",
    },
    quote: {
      en: "In the end, there were no tanks in the street. There was only a software update. With one click, identity was merged with the internet protocol. Those who are not logged in do not exist. And those who exist must obey. The red switch has been flipped—and we installed it ourselves.",
      de: "Am Ende gab es keine Panzer auf den Straßen. Es gab nur ein Software-Update. Mit einem Klick wurde die Identität mit dem Internetprotokoll verschmolzen. Wer nicht eingeloggt ist, existiert nicht. Und wer existiert, muss gehorchen. Der rote Schalter wurde umgelegt—und wir haben ihn selbst installiert.",
      es: "Al final, no hubo tanques en las calles. Solo hubo una actualización de software. Con un clic, la identidad se fusionó con el protocolo de internet. Quien no está conectado, no existe. Y quien existe, debe obedecer. El interruptor rojo fue activado... y lo instalamos nosotros mismos.",
      fr: "À la fin, il n'y eut aucun char dans les rues. Il n'y eut qu'une mise à jour logicielle. En un clic, l'identité fut fusionnée avec le protocole Internet. Ceux qui ne sont pas connectés n'existent pas. Et ceux qui existent doivent obéir. L'interrupteur rouge a été basculé—et nous l'avons installé nous-mêmes.",
    },
    readTimeMin: 6,
    sections: [
      {
        id: "ch6-sec1",
        heading: {
          en: "The Fusion of the Cloud and the Crown",
          de: "Die Fusion von Cloud und Krone",
          es: "La fusión de la nube y la corona",
          fr: "La fusion du Cloud et de la Couronne",
        },
        paragraphs: {
          en: [
            "The defining political illusion of the early digital age was the supposed conflict between Silicon Valley and sovereign states. Commentators wrote books about tech billionaires who would supposedly transcend national governments and float on autonomous sea-platforms. In truth, the corporate monopolies and the intelligence agencies were dancing a choreographed tango of mutual necessity.",
            "The state possessed the monopoly on legitimate physical violence and antitrust enforcement, but lacked the engineering talent, compute clusters, and behavioral data streams necessary to govern an interconnected populace. The tech giants possessed the data and the server farms, but required state defense contracts, intellectual property protection, and regulatory shields against foreign competition.",
            "The consummation of their union produced the Red Switch: an integrated institutional architecture where commercial software updates serve as the enforcement mechanism for administrative sovereignty. The division between public law and private terms of service was completely erased.",
          ],
          de: [
            "Die prägende politische Illusion des frühen Digitalzeitalters war die angebliche Feindschaft zwischen dem Silicon Valley und den Nationalstaaten. Autoren schrieben Bestseller über Tech-Milliardäre, die souveräne Regierungen ablösen und auf schwimmenden Meeresinseln leben würden. In Wahrheit führten Tech-Konzerne und Sicherheitsbehörden einen perfekt choreografierten Tango wechselseitiger Abhängigkeit auf.",
            "Der Staat besaß das Monopol auf physische Gewalt und Kartellstrafen, aber ihm fehlten die Entwickler-Talente, Rechenzentren und Datenströme, um eine digitalisierte Bevölkerung zu steuern. Die Tech-Konzerne besaßen die Daten und Serverfarmen, benötigten jedoch staatliche Rüstungsaufträge, Patentschutz und regulatorische Schutzschilde gegen unliebsame Konkurrenz.",
            "Die Vollendung dieser Ehe gebar den Roten Schalter: eine verschmolzene Machtarchitektur, in der kommerzielle Software-Updates zur Vollstreckungsinstanz staatlicher Gesetze wurden. Die Trennung zwischen öffentlichem Verfassungsrecht und privaten AGB löste sich restlos auf.",
          ],
          es: [
            "La gran ilusión fue creer que las grandes tecnológicas y los gobiernos eran enemigos naturales. En realidad, bailaban un tango de dependencia mutua.",
            "El Estado tenía el monopolio de la fuerza legal, pero carecía de los centros de datos masivos. Las corporaciones tenían los datos, pero necesitaban contratos de defensa y protección de patentes.",
            "Su alianza forjó el Interruptor Rojo: un sistema donde las actualizaciones de software comerciales ejecutan las órdenes de la soberanía administrativa.",
          ],
          fr: [
            "La grande illusion du numérique fut l'opposition de façade entre la Silicon Valley et les gouvernements. En vérité, géants de la tech et agences de renseignement formaient un duo complice.",
            "L'État détenait le monopole de la contrainte, mais manquait d'infrastructures cloud. Les multinationales possédaient les données, mais convoitaient les contrats militaires et la protection réglementaire.",
            "Cette symbiose a engendré l'Interrupteur Rouge : une architecture où la mise à jour logicielle devient l'instrument suprême du pouvoir régalien.",
          ],
        },
      },
      {
        id: "ch6-sec2",
        heading: {
          en: "The Protocolization of Legal Identity",
          de: "Die Protokollierung der legalen Identität",
          es: "La protocolización de la identidad legal",
          fr: "La protocolisation de l'identité légale",
        },
        paragraphs: {
          en: [
            "The technical triumph that completed this hierarchy was the death of anonymous network transport. For fifty years, the internet operated on an end-to-end principle that routed data packets based purely on destination addresses, regardless of who was sitting behind the terminal. A packet containing Shakespeare was treated with the exact same routing priority as a packet containing illicit software.",
            "Under the banner of eliminating malicious botnets, identity theft, and automated harassment, the consortium of cloud monopolies and telecom regulators introduced the Verified Origin Header. Every data packet was cryptographically signed by the user's state-issued biometric certificate authority. Browsing without signing was made impossible at the physical router level.",
            "There were no arrests. There were no riots. A Monday night operating system patch pushed the new root certificates to four billion handsets while their owners slept on bedside nightstands. When the world woke up, anonymous thought had ceased to be an architectural possibility.",
          ],
          de: [
            "Der technische Triumph, der diese Hierarchie zementierte, war die Abschaffung des anonymen Datentransports. Fünfzig Jahre lang beruhte das Internet auf dem Grundsatz, Pakete allein anhand von Zieladressen zu befördern—völlig unabhängig davon, wer am Rechner saß. Ein Datenpaket mit Texten von Goethe wurde im Router exakt genauso behandelt wie Schadsoftware.",
            "Unter dem Vorwand, Botnetze, Identitätsdiebstahl und Hetze im Netz auszumerzen, führten die Cloud-Monopole und Telekom-Behörden den 'Verified Origin Header' ein. Jedes einzelne Datenpaket musste fortan mit dem staatlichen biometrischen Stammzertifikat des Absenders signiert sein. Ein unautorisiertes Senden wurde auf Hardware-Ebene technisch unmöglich gemacht.",
            "Es gab keine Razzien. Keine Massenproteste. Ein banaler Betriebssystem-Patch in der Nacht von Montag auf Dienstag installierte die neuen Stammzertifikate auf vier Milliarden Smartphones, während ihre Besitzer schliefen. Als die Welt erwachte, war der anonyme Gedanke im Netz technisch schlichtweg ausgestorben.",
          ],
          es: [
            "El cambio decisivo fue la supresión del transporte anónimo de paquetes de datos. Durante medio siglo, internet encaminó paquetes sin preguntar quién estaba al teclado.",
            "Con la excusa de atajar fraudes y desinformación, se instauró la cabecera de origen verificado obligatoria: cada paquete TCP/IP requería la firma biométrica oficial del usuario.",
            "No hubo resistencia popular: una actualización nocturna del sistema operativo instaló los certificados raíz en miles de millones de teléfonos.",
          ],
          fr: [
            "L'aboutissement technique fut l'élimination du routage anonyme. Pendant un demi-siècle, le protocole Internet acheminait les paquets sans s'enquérir de l'identité de l'émetteur.",
            "Sous prétexte de neutraliser bots et cyberattaques, les régulateurs ont imposé la signature cryptographique obligatoire de chaque paquet émis par un citoyen vérifié.",
            "Aucune émeute n'éclata : une mise à jour silencieuse nocturne activa les certificats sur tous les terminaux de la planète.",
          ],
        },
      },
      {
        id: "ch6-sec3",
        heading: {
          en: "The Deprecation of Existence",
          de: "Die Deprekation der bürgerlichen Existenz",
          es: "La depreciación de la existencia civil",
          fr: "La dépréciation de l'existence civile",
        },
        paragraphs: {
          en: [
            "The Red Switch does not need to dispatch a SWAT team to neutralize a dissident. Physical arrests are expensive, create traumatic smartphone videos, and fuel public indignation. The modern sovereign acts through deprecation.",
            "With a single administrative toggle, the target's public key is revoked in the root directory. Instantly, their phone displays an invalid certificate error. Their banking app disconnects; their smart door lock fails to recognize their keycard; their electric vehicle shifts into park and refuses to engage the transmission; their health insurance barcode scans as null. The dissident is not imprisoned in a fortress—they are ghosted from reality.",
          ],
          de: [
            "Der Rote Schalter muss kein Sondereinsatzkommando entsenden, um einen Oppositionellen mundtot zu machen. Physische Verhaftungen sind teuer, erzeugen verstörende Handyvideos und stiften Unruhe. Der moderne Souverän agiert über das Widerrufen digitaler Zertifikate.",
            "Mit einem einzigen Mausklick in der Administrationskonsole wird der öffentliche Schlüssel der Zielperson für ungültig erklärt. Binnen Sekunden zeigt das Smartphone einen Zertifikatsfehler. Die Banking-App bricht ab; das elektronische Türschloss verweigert den Dienst; das Elektroauto schaltet in den Parkmodus und rührt sich nicht mehr; der Barcode der Krankenkassenkarte meldet einen Lesefehler. Der Dissident wandert nicht in den Kerker—er wird aus der Realität ausradiert.",
          ],
          es: [
            "El Interruptor Rojo no manda policías a derribar puertas: las detenciones físicas son escandalosas y provocan vídeos virales molestos. Actúa revocando certificados.",
            "Basta pulsar una casilla y la clave pública del disidente queda invalidada: el banco no abre, el coche eléctrico no arranca y el billete de autobús da error. Se le borra del mundo sin ruido.",
          ],
          fr: [
            "L'Interrupteur Rouge ne déploie pas de blindés. Les arrestations physiques créent des martyrs et des vidéos virales. Le pouvoir révoque simplement un certificat numérique.",
            "D'un clic dans la console, votre clé est désactivée. Votre compte bancaire est inaccessible, votre véhicule refuse de démarrer et votre serrure électronique reste close. Le dissident n'est pas enfermé : il est effacé du monde.",
          ],
        },
      },
    ],
    dossier: {
      caseStudy: {
        title: {
          en: "The Fusion of Cloud Infrastructure with National Defense (JWCC)",
          de: "Die Fusion von Cloud-Infrastruktur und Verteidigungsapparat (JWCC)",
          es: "La Fusión de Infraestructura Cloud y Defensa (JWCC)",
          fr: "Fusion de l'Infrastructure Cloud et de la Défense (JWCC)",
        },
        jurisdiction: "United States / Global Cloud Providers",
        year: "2020–2026",
        summary: {
          en: "Multi-billion dollar defense contracts tying commercial cloud hyperscalers directly into military command, border telemetry, and automated intelligence pipelines.",
          de: "Milliardenschwere Verträge (JWCC), die kommerzielle Cloud-Konzerne unauflösbar mit militärischer Führung und staatlicher Überwachung verzahnten.",
          es: "Contratos de defensa multimillonarios que integran los hiperescaladores de la nube en el mando militar y el control de fronteras.",
          fr: "Contrats de défense de plusieurs milliards reliant directement les géants du cloud aux centres de commandement militaire et de surveillance.",
        },
        legalReference: "Joint Warfighting Cloud Capability (JWCC); Defense Production Act Mandates",
        significance: {
          en: "Eradicated any boundary between commercial consumer platforms and national military surveillance infrastructure.",
          de: "Löschte jede Trennlinie zwischen zivilen Verbraucherplattformen und militärischem Überwachungsapparat aus.",
          es: "Eliminó toda frontera entre las plataformas civiles de consumo y la infraestructura militar.",
          fr: "A aboli toute distinction entre plateformes grand public et appareils militaires de surveillance.",
        },
        sourceUrl: "https://www.defense.gov/News/Releases/Release/Article/3239378/department-of-defense-announces-joint-warfighting-cloud-capability-procurement/",
        sourceName: "US Department of Defense Press Release",
        documentType: "Official Pentagon Procurement Contract (JWCC)",
      },
      declassifiedNote: {
        en: "Intelligence procurement transcript: 'We do not build the grid; we lease the grid and hold the root keys.'",
        de: "Beschaffungsprotokoll: 'Wir bauen das Netz nicht; wir mieten es an und behalten die Root-Schlüssel.'",
        es: "Acta de adquisiciones: 'No construimos la red; la alquilamos y retenemos las claves maestras.'",
        fr: "Procès-verbal de renseignement : 'Nous ne construisons pas le réseau ; nous le louons et gardons les clés maîtresses.'",
      },
      keyMetrics: [
        { label: { en: "Root Certificate Authorities", de: "Staatliche Stammzertifikate", es: "Autoridades raíz estatales", fr: "Autorités racine étatiques" }, value: "14" },
        { label: { en: "Packets Without ID Verified", de: "Pakete ohne Identitätsprüfung", es: "Paquetes sin identidad", fr: "Paquets sans identifiant" }, value: "0.00%" },
        { label: { en: "Interception Latency", de: "Abfang-Latenz", es: "Latencia de interceptación", fr: "Latence d'interception" }, value: "< 2ms" },
      ],
      externalSources: [
        {
          title: "Department of Defense Joint Warfighting Cloud Capability (JWCC) Award Notice",
          url: "https://www.defense.gov/News/Releases/Release/Article/3239378/department-of-defense-announces-joint-warfighting-cloud-capability-procurement/",
          organization: "U.S. Department of Defense",
          type: "Official Government Procurement Record",
        },
        {
          title: "EFF: NSA Interception Architecture (AT&T Room 641A Historical Precedent)",
          url: "https://www.eff.org/pages/nsa-spying",
          organization: "Electronic Frontier Foundation",
          type: "Investigative Case Archive",
        },
      ],
    },
  },
  {
    id: 7,
    slug: "privatization-of-truth",
    number: "07",
    title: {
      en: "The Privatization of Truth",
      de: "Die Privatisierung der Wahrheit",
      es: "La Privatización de la Verdad",
      fr: "La Privatisation de la Vérité",
    },
    theme: {
      en: "How governments outsource the responsibility for censorship to tech giants to bypass constitutional protections.",
      de: "Wie Regierungen die Verantwortung für Zensur an Tech-Giganten auslagern, um verfassungsrechtliche Hürden zu umgehen.",
      es: "Cómo los gobiernos subcontratan la censura a gigantes tecnológicos para eludir las protecciones constitucionales.",
      fr: "Comment les gouvernements sous-traitent la censure aux géants technologiques pour contourner les verrous constitutionnels.",
    },
    quote: {
      en: "The state no longer needs to get its own hands dirty. Through laws that hold platforms liable for every wrong word, we have trained corporations to be our digital bouncers. They delete not because they must, but out of anticipatory obedience.",
      de: "Der Staat muss sich nicht mehr die Hände schmutzig machen. Durch Gesetze, die Plattformen für jedes falsche Wort haftbar machen, haben wir Konzerne zu unseren digitalen Türstehern erzogen. Sie löschen nicht, weil sie müssen, sondern aus vorauseilendem Gehorsam.",
      es: "El Estado ya no necesita mancharse las manos. Mediante leyes que responsabilizan a las plataformas de cada palabra errónea, hemos adiestrado a las corporaciones para ser nuestros porteros digitales. Borran no porque deban, sino por obediencia anticipada.",
      fr: "L'État n'a plus besoin de se salir les mains. Par des lois qui rendent les plateformes pénalement responsables de chaque mot déplacé, nous avons formé les corporations à devenir nos videurs numériques. Elles effacent par zèle et obéissance anticipée.",
    },
    readTimeMin: 6,
    sections: [
      {
        id: "ch7-sec1",
        heading: {
          en: "Constitutional Evasion via Intermediary Liability",
          de: "Die Umgehung der Verfassung durch Intermediärshaftung",
          es: "Evasión constitucional mediante responsabilidad de intermediarios",
          fr: "Contournement constitutionnel via la responsabilité des intermédiaires",
        },
        paragraphs: {
          en: [
            "In every constitutional democracy, the greatest barrier to executive overreach is the bill of rights. A minister of information cannot simply issue an edict decreeing that a critical newspaper be shut down or that a peaceful political manifest be barred from printing presses. The courts would step in; injunctions would be granted; public scandals would erupt.",
            "To dismantle this constitutional shield, legislators designed a brilliant administrative sidestep: intermediary liability. Rather than directly outlawing political speech, the state enacted statutes holding the hosting platforms financially liable for any user-generated content that might be deemed unlawful, defamatory, or harmful. If a platform fails to remove a reported post within 24 hours, it faces fines of tens of millions of euros.",
            "This inverted the economic incentives of digital platforms overnight. In the courtroom of constitutional law, the presumption is innocence until proven guilty. In the risk-management department of a multi-billion-dollar platform, the presumption is delete first, ask questions never.",
          ],
          de: [
            "In jeder rechtsstaatlichen Demokratie sind die Grundrechte das stärkste Bollwerk gegen staatliche Willkür. Ein Innenminister kann nicht einfach per Federstrich verfügen, dass eine kritische Zeitung verboten oder ein unliebsames Flugblatt eingezogen wird. Unabhängige Gerichte würden einschreiten, einstweilige Verfügungen erlassen und die Regierung blamieren.",
            "Um dieses verfassungsrechtliche Schild zu umgehen, ersannen Gesetzgeber ein juristisches Meisterstück: die verschärfte Plattformhaftung. Statt abweichende Meinungen selbst zu verbieten, drohte der Staat den Betreibern sozialer Netzwerke mit existenzbedrohenden Bußgeldern, sollten diese gemeldete 'rechtswidrige oder schädliche' Inhalte nicht binnen 24 Stunden tilgen.",
            "Damit wurden die wirtschaftlichen Anreize der Tech-Konzerne auf den Kopf gestellt. Vor einem ordentlichen Gericht gilt die Unschuldsvermutung. In der Rechtsabteilung eines Plattformkonzerns hingegen regiert das Prinzip: Im Zweifel sofort löschen, blockieren und niemals nachfragen.",
          ],
          es: [
            "En las democracias, los derechos fundamentales impiden que un ministro cierre un periódico opositor o confisque libros sin orden judicial.",
            "Para eludir esta traba, se inventó la responsabilidad legal de las plataformas. Con multas astronómicas por cada publicación no retirada en 24 horas, las empresas se convirtieron en juezas.",
            "En los departamentos legales de las multinacionales reina una regla sencilla: borrar primero, no preguntar jamás.",
          ],
          fr: [
            "Dans un État de droit, la constitution interdit formellement au pouvoir d'interdire un journal d'opposition ou de saisir des écrits sans contrôle judiciaire.",
            "Pour esquiver ce verrou, le législateur a transféré la responsabilité pénale aux hébergeurs en leur infligeant des amendes record en cas de maintien d'un contenu contesté au-delà de 24 heures.",
            "Dans les bureaux juridiques des multinationales, le mot d'ordre est limpide : supprimer d'abord, ne jamais poser de questions.",
          ],
        },
      },
      {
        id: "ch7-sec2",
        heading: {
          en: "The Culture of Anticipatory Obedience",
          de: "Die Kultur des vorauseilenden Gehorsams",
          es: "La cultura de la obediencia anticipada",
          fr: "La culture de l'obéissance anticipée",
        },
        paragraphs: {
          en: [
            "When corporate algorithms are calibrated to minimize regulatory risk, they inevitably over-censor. Nuance, irony, historical satire, legitimate whistleblower revelations, and controversial philosophical debate are caught in the broad sweep of automated semantic filters. The machine cannot discern whether an investigative journalist is exposing government corruption or spreading malicious rumors; it only registers that the semantic keywords trigger a high compliance risk score.",
            "This gave birth to a corporate culture of anticipatory obedience. The technology giants did not wait for regulatory agencies to file complaints. They built internal 'trust and safety' bureaucracies larger than the intelligence services of medium-sized nations, constantly expanding the list of forbidden topics to curry favor with parliamentary oversight committees.",
            "The state achieved the total control of public discourse without ever employing a single state censor. The corporations perform the dirty work, and the constitution remains theoretically unblemished on paper.",
          ],
          de: [
            "Werden Filteralgorithmen darauf trainiert, jedes regulatorische Risiko zu meiden, betreiben sie zwangsläufig 'Overblocking'. Ironie, Zynismus, historische Zitate, investigative Recherchen und hitzige Debatten fallen den pauschalen Klassifikatoren zum Opfer. Eine Maschine kann nicht unterscheiden, ob ein Journalist einen Korruptionsskandal aufdeckt oder Verleumdung betreibt; sie registriert lediglich, dass die Signalwörter das Haftungsrisiko in die Höhe treiben.",
            "So entstand eine Kultur des vorauseilenden Gehorsams. Die Plattformbetreiber warteten nicht auf behördliche Anordnungen. Sie bauten interne 'Trust and Safety'-Bürokratien auf, die größer waren als die Nachrichtendienste mittelgroßer Staaten, und erweiterten kontinuierlich ihre Zensurlisten, um der Politik zu gefallen.",
            "Der Staat erreichte die lückenlose Kontrolle des öffentlichen Diskurses, ohne je einen eigenen Zensor einstellen zu müssen. Die Konzerne erledigten die Drecksarbeit—und die Verfassung blieb auf dem Papier makellos rein.",
          ],
          es: [
            "Los filtros automáticos cometen inevitablemente censura por exceso: ironía, sátira, investigación periodística y debate histórico son barridos por igual.",
            "Las plataformas construyeron ejércitos de moderadores y filtros predictivos para anticiparse a los deseos de los gobiernos antes de recibir apercibimientos.",
            "El Estado logró el control absoluto del discurso público sin contratar a un solo censor público: la empresa privada hace el trabajo sucio.",
          ],
          fr: [
            "Les filtres algorithmiques pèchent systématiquement par excès : l'humour, la dénonciation légitime et la recherche historique sont balayés sans discernement.",
            "Les multinationales ont instauré de véritables armées de modération pour devancer les exigences ministérielles et prouver leur zèle politique.",
            "Le pouvoir a accompli le contrôle total de la parole sans employer le moindre censeur officiel : les corporations privées exécutent la besogne.",
          ],
        },
      },
    ],
    dossier: {
      caseStudy: {
        title: {
          en: "The German Network Enforcement Act (NetzDG) & Its Global Descendants",
          de: "Das Netzwerkdurchsetzungsgesetz (NetzDG) & seine globalen Ableger",
          es: "La Ley de Cumplimiento en Redes de Alemania (NetzDG) y sus Réplicas",
          fr: "La Loi allemande sur l'Application des Réseaux (NetzDG) et ses Dérivés",
        },
        jurisdiction: "Germany / Global Replicas (over 25 nations)",
        year: "2017–2025",
        summary: {
          en: "Statutory framework imposing fines up to €50 million on social networks for failing to swiftly delete illegal content, triggering automated over-blocking across millions of user accounts.",
          de: "Gesetzlicher Rahmen mit Bußgeldern bis zu 50 Mio. Euro bei verspäteter Löschung, was zu flächendeckendem 'Overblocking' durch automatisierte Filter führte.",
          es: "Marco normativo con multas de hasta 50 millones de euros por demoras en la eliminación de contenido, provocando bloqueos masivos preventivos.",
          fr: "Dispositif législatif sanctionnant d'amendes jusqu'à 50 millions d'euros la non-suppression rapide de contenus, provoquant un surblocage automatisé massif.",
        },
        legalReference: "NetzDG / German Federal Gazette; UN Special Rapporteur on Freedom of Opinion Critique",
        significance: {
          en: "Pioneered the legislative model of deputizing private technology companies as privatized judges and censors.",
          de: "Wegbereiter des Modells, private Digitalkonzerne zu staatlich getriebenen Schiedsrichtern über das freie Wort zu machen.",
          es: "Pionero en convertir a las empresas privadas en jueces sumarios de la palabra pública.",
          fr: "Pionnier du modèle déléguant la censure et la justice sommaire aux géants technologiques privés.",
        },
        sourceUrl: "https://www.bmj.de/DE/themen/digitales/netzdg/netzdg_node.html",
        sourceName: "Federal Ministry of Justice (BMJ) Official Information",
        documentType: "German Federal Statute (NetzDG)",
      },
      declassifiedNote: {
        en: "Platform compliance audit: 'Our automated moderation filters err on the side of takedown to maintain operational legal indemnity.'",
        de: "Plattform-Prüfbericht: 'Unsere Filter löschen im Zweifel präventiv, um jedes Haftungsrisiko für den Konzern auszuschließen.'",
        es: "Auditoría de cumplimiento: 'Nuestros filtros automáticos eliminan por exceso para salvaguardar la indemnidad jurídica de la empresa.'",
        fr: "Audit de conformité : 'Nos filtres suppriment par excès pour préserver la responsabilité juridique de l'entreprise.'",
      },
      keyMetrics: [
        { label: { en: "Automated Takedowns / Quarter", de: "Automatisierte Löschungen / Quartal", es: "Eliminaciones automáticas / trim.", fr: "Suppressions automatisées / trim." }, value: "12.7M" },
        { label: { en: "Human Review Proportion", de: "Menschliche Prüfung", es: "Revisión humana", fr: "Examen humain" }, value: "3.2%" },
        { label: { en: "Restoration Success Rate", de: "Erfolgreiche Einsprüche", es: "Tasa de restablecimiento", fr: "Taux de rétablissement" }, value: "1.1%" },
      ],
      externalSources: [
        {
          title: "Netzwerkdurchsetzungsgesetz (NetzDG) - Official Text",
          url: "https://www.bmj.de/DE/themen/digitales/netzdg/netzdg_node.html",
          organization: "Bundesministerium der Justiz",
          type: "Federal Legal Statute",
        },
        {
          title: "Human Rights Watch: Germany's Flawed Social Media Law and Global Fallout",
          url: "https://www.hrw.org",
          organization: "Human Rights Watch",
          type: "Human Rights Documentation",
        },
      ],
    },
  },
  {
    id: 8,
    slug: "legacy-of-transparency",
    number: "08",
    title: {
      en: "The Legacy of Transparency",
      de: "Das Erbe der Transparenz",
      es: "El Legado de la Transparencia",
      fr: "L'Héritage de la Transparence",
    },
    theme: {
      en: "The reversal of the democratic principle: the citizen becomes transparent while the power structures remain in the dark.",
      de: "Die Umkehrung des demokratischen Prinzips: Der Bürger wird gläsern, während die Machtstrukturen im Dunkeln bleiben.",
      es: "La inversión del principio democrático: el ciudadano se vuelve transparente mientras el poder se refugia en la oscuridad.",
      fr: "L'inversion du principe démocratique : le citoyen devient transparent tandis que le pouvoir s'enveloppe d'opacité.",
    },
    quote: {
      en: "The people used to monitor the government. Today, the infrastructure monitors the people. We live in a house of glass where every movement is recorded, while the algorithms that decide our credit, our jobs, or our reputations remain hidden behind walls of proprietary code.",
      de: "Früher kontrollierte das Volk die Regierung. Heute kontrolliert die Infrastruktur das Volk. Wir leben in einem Glashaus, in dem jede Bewegung aufgezeichnet wird, während die Algorithmen, die über unseren Kredit, unseren Job oder unseren Ruf entscheiden, hinter Mauern proprietären Codes verborgen bleiben.",
      es: "Antes el pueblo controlaba al gobierno. Hoy la infraestructura vigila al pueblo. Vivimos en una casa de cristal donde cada movimiento queda registrado, mientras los algoritmos que deciden nuestro crédito, empleo o reputación permanecen ocultos tras muros de código propietario.",
      fr: "Jadis, le peuple contrôlait les gouvernants. Aujourd'hui, l'infrastructure surveille le peuple. Nous vivons dans une maison de verre où chaque geste est enregistré, tandis que les algorithmes décidant de nos crédits, de nos carrières et de nos réputations se terrent derrière des murs de code propriétaire.",
    },
    readTimeMin: 6,
    sections: [
      {
        id: "ch8-sec1",
        heading: {
          en: "The Inverted Panopticon",
          de: "Das invertierte Panoptikum",
          es: "El panóptico invertido",
          fr: "Le panoptique inversé",
        },
        paragraphs: {
          en: [
            "The Enlightenment was animated by a single radical demand: the ruler must be brought into the sunlight. For centuries, kings, cardinals, and ministers governed from secret cabinet chambers, issuing decrees whose origins were concealed from the rabble. Democratic revolutions reversed this: parliament sessions were opened to public observers, government budgets were published in newspapers, and freedom of information laws gave every citizen the right to inspect state archives.",
            "Over the last three decades, this hard-won constitutional balance was completely inverted. While citizens were subjected to radical, totalizing transparency—every credit transaction logged, every cell tower connection recorded, every search query archived, and facial recognition cameras mounted at every crosswalk—the institutions of governance retreated into deep, impenetrable digital shadows.",
            "Today, the citizen lives in a house constructed entirely of one-way glass. From the outside, the state, the cloud oligopolies, and the intelligence agencies see every intimate gesture, every purchase, and every emotional inflection. From the inside, the citizen looking out sees only an opaque, black mirror.",
          ],
          de: [
            "Die Aufklärung lebte von einer einzigen revolutionären Forderung: Die Herrschenden müssen ans Licht gezerrt werden. Jahrhundertelang hatten Monarchen und Kanzler in Geheimkabinetten regiert und Erlasse verkündet, deren Motive dem Volk verborgen blieben. Die demokratischen Revolutionen kehrten dies um: Parlamentsdebatten wurden öffentlich, Staatskassen wurden offengelegt und Informationsfreiheitsgesetze gaben jedem Bürger das Recht, Behördenakten einzusehen.",
            "In den vergangenen dreißig Jahren wurde dieses mühsam errungene Gleichgewicht auf den Kopf gestellt. Während der Bürger einer totalen, radikalen Transparenz unterworfen wurde—jede Kartenzahlung gespeichert, jeder Funkzellenwechsel protokolliert, jede Websuche archiviert und jede Straßenkreuzung mit Gesichtsscannern überwacht—zogen sich die Machteliten in undurchdringliche digitale Schatten zurück.",
            "Der Bürger von heute bewohnt ein Haus aus einseitig verspiegeltem Glas: Von außen blicken Staat, Geheimdienste und Cloud-Konzerne auf jede noch so intime Regung, jeden Einkauf und jeden Zweifel. Blickt der Bürger jedoch nach draußen, sieht er nur eine pechschwarze, spiegelnde Wand.",
          ],
          es: [
            "La Ilustración exigió que los gobernantes rindieran cuentas a la luz del día. Las asambleas se hicieron públicas y las leyes de libertad de información abrieron los archivos oficiales a la ciudadanía.",
            "En las últimas tres décadas, esta conquista se invirtió totalmente: mientras cada paso, compra o mensaje del ciudadano queda grabado, el aparato estatal se oculta tras secretos de estado y modelos cerrados.",
            "Vivimos en una casa con cristales espía: el poder lo ve todo desde fuera, pero desde dentro solo vemos nuestro propio reflejo impotente.",
          ],
          fr: [
            "Les Lumières exigeaient que le prince gouverne sous le regard du peuple. Les débats devinrent publics et les archives accessibles.",
            "Ce principe a été totalement inversé : le citoyen subit une transparence tyrannique et totale, tandis que les structures régaliennes et corporatives s'enveloppent d'un secret impénétrable.",
            "Nous habitons une pièce aux miroirs sans tain : surveillés dans le moindre détail sans jamais pouvoir percer l'opacité du pouvoir.",
          ],
        },
      },
      {
        id: "ch8-sec2",
        heading: {
          en: "Proprietary Code as Sovereign Cloak",
          de: "Proprietärer Code als Schutzmantel der Macht",
          es: "El código propietario como manto de soberanía",
          fr: "Le code propriétaire comme bouclier régalien",
        },
        paragraphs: {
          en: [
            "When public institutions outsourced their operational decision-making to private machine learning models, they accomplished a legal miracle: they exempted administrative power from freedom of information laws. If a police department buys an algorithmic predictive policing engine or a welfare ministry deploys an automated fraud detection matrix, the source code and training weights are classified as 'proprietary trade secrets.'",
            "When investigative journalists or civil liberties attorneys demand to see how the software determines who is audited, who is arrested, or who is denied medical subsidies, the vendor's corporate lawyers successfully argue in court that disclosing the algorithm would cause irreparable commercial harm to their intellectual property.",
            "Constitutional due process—the ancient common law right to confront the evidence and reasoning against you—was effectively abolished in favor of a software vendor's licensing agreement.",
          ],
          de: [
            "Als staatliche Behörden ihre Entscheidungsfindung an private Machine-Learning-Modelle auslagerten, vollbrachten sie ein juristisches Kunststück: Sie entzogen staatliches Handeln der Informationsfreiheit. Kauft eine Polizeibehörde Predictive-Policing-Software oder setzt eine Rentenkasse Betrugs-Erkennungsmodelle ein, werden Quellcode und Trainingsdaten als 'Betriebs- und Geschäftsgeheimnisse' eingestuft.",
            "Verlangen Journalisten oder Bürgerrechtler Einsicht in jene Kriterien, nach denen Menschen observiert, Anträge abgelehnt oder Konten gesperrt werden, parieren die Konzernanwälte vor Gericht erfolgreich: Eine Offenlegung des Algorithmus würde das geistige Eigentum des Herstellers verletzen.",
            "Der elementare rechtsstaatliche Grundsatz, dass die Begründung einer staatlichen Maßnahme nachprüfbar sein muss, wurde durch den Lizenzvertrag eines privaten Softwarehauses beerdigt.",
          ],
          es: [
            "Al subcontratar decisiones a algoritmos privados de aprendizaje automático, el Estado eludió las leyes de transparencia: el código es secreto comercial.",
            "Si un ciudadano pregunta por qué se le niega una ayuda o se le vigila, la empresa alega que mostrar la fórmula arruinaría su patente.",
            "El derecho fundamental a conocer las pruebas en tu contra quedó suspendido en beneficio de una licencia de software privativo.",
          ],
          fr: [
            "En confiant l'évaluation sociale à des modèles d'apprentissage automatique privés, l'administration a soustrait ses décisions au droit d'accès aux documents administratifs.",
            "Quiconque conteste un profilage ou un refus d'aide se heurte au secret industriel des éditeurs de logiciels.",
            "Le principe constitutionnel du contradictoire s'est effacé devant la protection des droits de propriété intellectuelle des firmes technologiques.",
          ],
        },
      },
    ],
    dossier: {
      caseStudy: {
        title: {
          en: "Proprietary Recidivism Algorithms (COMPAS) & Secret Administrative Scoring",
          de: "Proprietäre Rückfall-Algorithmen (COMPAS) & Geheime Justiz-Scores",
          es: "Algoritmos Propietarios de Reincidencia (COMPAS) y Justicia Oculta",
          fr: "Algorithmes de Récidive Propriétaires (COMPAS) et Justice Secrète",
        },
        jurisdiction: "United States Federal & State Courts",
        year: "2016–2025",
        summary: {
          en: "Judicial reliance on commercial, closed-source risk-assessment algorithms (COMPAS) to decide criminal sentencing, where defendants are denied the right to inspect algorithmic weights under trade secret law.",
          de: "Gerichtlicher Einsatz geheimer Algorithmen (COMPAS) zur Strafmaßfestsetzung, bei dem Angeklagten unter Berufung auf Betriebsgeheimnisse jede Einsicht in die Funktionsweise verwehrt wurde.",
          es: "Uso judicial de algoritmos cerrados para fijar condenas penales, negando a los acusados el derecho a auditar el código por secreto comercial.",
          fr: "Utilisation par les tribunaux d'algorithmes prédictifs à code fermé pour déterminer les peines de prison, refusant aux prévenus l'examen des formules au nom du secret commercial.",
        },
        legalReference: "State v. Loomis, 881 N.W.2d 749 (Wis. 2016); ProPublica 'Machine Bias'",
        significance: {
          en: "Subordinated fundamental constitutional due process to the proprietary intellectual property claims of private software vendors.",
          de: "Stellte das geistige Eigentum privater Softwarefirmen über den rechtsstaatlichen Anspruch auf ein faires Verfahren.",
          es: "Subordinó el derecho constitucional al debido proceso a la propiedad intelectual de una empresa privada.",
          fr: "A subordonné le droit fondamental à un procès équitable aux intérêts de propriété intellectuelle d'une firme privée.",
        },
        sourceUrl: "https://harvardlawreview.org/print/vol-130/state-v-loomis/",
        sourceName: "Harvard Law Review Analysis (State v. Loomis)",
        documentType: "Supreme Court Landmark Precedent",
      },
      declassifiedNote: {
        en: "Judicial council transcript: 'The defense attorney cannot inspect the proprietary weights; doing so would infringe on vendor trade secrets.'",
        de: "Gerichtsprotokoll: 'Der Verteidigung kann keine Einsicht in die Modellgewichte gewährt werden; dies würde die Betriebsgeheimnisse des Anbieters verletzen.'",
        es: "Transcripción judicial: 'La defensa no puede inspeccionar los pesos del modelo; violaría los secretos comerciales del proveedor.'",
        fr: "Transcription du tribunal : 'La défense ne peut examiner les pondérations du modèle, cela porterait atteinte aux secrets commerciaux du fournisseur.'",
      },
      keyMetrics: [
        { label: { en: "Black-Box Legal Decisions", de: "Blackbox-Urteile", es: "Sentencias de caja negra", fr: "Décisions boîte noire" }, value: "480,000+" },
        { label: { en: "Code Inspections Granted", de: "Genehmigte Code-Audits", es: "Auditorías de código autorizadas", fr: "Audits de code accordés" }, value: "0" },
        { label: { en: "Citizen Transparency Index", de: "Bürger-Transparenz-Index", es: "Índice de transparencia ciudadana", fr: "Indice de transparence citoyenne" }, value: "98.4%" },
      ],
      externalSources: [
        {
          title: "Harvard Law Review: State v. Loomis and Algorithmic Due Process",
          url: "https://harvardlawreview.org/print/vol-130/state-v-loomis/",
          organization: "Harvard Law School",
          type: "Constitutional Law Journal",
        },
        {
          title: "ProPublica: Machine Bias - Investigative Report on Sentencing Algorithms",
          url: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
          organization: "ProPublica",
          type: "Investigative Journalism Milestone",
        },
      ],
    },
  },
];

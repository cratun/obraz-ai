import { GENERATION_DATA, GenerationStyle } from '@/app/_utils/constants';

type Inspiration = {
  id: string;
  style: GenerationStyle;
  prompt: string;
};

export const styles = GENERATION_DATA.reduce<Record<GenerationStyle, string>>(
  (acc, el) => {
    if (el.generationStyle === 'adjusted') return acc;
    acc[el.generationStyle] = el.text;

    return acc;
  },
  {} as Record<GenerationStyle, string>,
);

export const inspirationData: Inspiration[] = [
  {
    id: '1',
    style: 'hyperrealism',
    prompt: 'Tarantula wykonana z lodu, pokryta soplami, krocząca po wodzie, której kroki zamrażają powierzchnię.',
  },
  {
    id: '2',
    style: 'hyperrealism',
    prompt:
      'Pół-realisticzny, świecący demoniczny czajnik z złowrogimi oczami, wiszący na łańcuchu nad ogniskiem w kominku. Z dynamicznym oświetleniem, płytką głębią ostrości i wysoką rozdzielczością.',
  },
  {
    id: '3',
    style: 'hyperrealism',
    prompt:
      'Fantastyczna i surrealistyczna scena z uroczym żabim DJ-em noszącym ogromne, tęczowe słuchawki i czarną bluzę z neonowymi akcentami, miksującym muzykę elektryzującą tłum. Scena to mieszanka miejskiego klubu nocnego i dzikiej sawanny, z migającymi neonami łączącymi się z naturalnymi elementami jak wysokie trawy i drzewa akacjowe. W tle żywa publiczność zwierząt, od domowych psów i królików po dżunglowe zebry i żyrafy, tańczy pod świetlistym, wielobarwnym baldachimem. Maszyny dymne, lasery i pulsujące głośniki podkreślają dynamiczną atmosferę, wyraźny napis „DJ Froggy in the house!',
  },
  {
    id: '4',
    style: 'hyperrealism',
    prompt:
      'Słodki, kawaii stworek w kształcie połówki awokado z motylim skrzydłem, dużymi oczami i ostrym nosem, unoszący się nad zielonymi polami w wietrzną, pomarańczowo-różową scenerię zachodzącego słońca.',
  },
  {
    id: '5',
    style: 'hyperrealism',
    prompt:
      'Zbliżenie na ogromne smocze oko i postać w czarnej szacie w surrealistycznej, mglisto-śnieżnej atmosferze.',
  },
  {
    id: '6',
    style: 'hyperrealism',
    prompt:
      'Realistyczna scena portu umieszczona w wannie, wyglądająca jak miniaturowy model. W porcie są statki, dźwigi, kontenery i doki, a woda w wannie przypomina spokojne morze. Na brzegu widoczne są drobne łazienkowe przedmioty, które podkreślają surrealizm tej scenerii.',
  },
  {
    id: '7',
    style: 'hyperrealism',
    prompt:
      'Wojownik w skórzanym pancerzu, z hełmem ozdobionym rogami, spogląda w niebo, gdzie nad wioską unosi się smok.',
  },
  {
    id: '8',
    style: 'hyperrealism',
    prompt:
      'Zbliżenie na usta kobiety w monochromatycznym ujęciu, z wyjątkiem jej ust, które świecą intensywnym, żółtym blaskiem. Delikatne, eteryczne żółte fale dymu unoszą się z jej ust, łagodnie rozprzestrzeniając się w powietrzu. Reszta obrazu jest w czerni i bieli, co tworzy silny kontrast z żywym żółtym blaskiem, podkreślając surrealistyczną, senną atmosferę sceny.',
  },
  {
    id: '9',
    style: 'hyperrealism',
    prompt: 'Puchaty kociak owinięty w tortille, z kawałkami mięsa i warzywami, trzymany w dłoniach.',
  },
  {
    id: '10',
    style: 'hyperrealism',
    prompt:
      'Pociąg ozdobiony kwitnącymi kwiatami, zwiewne zwierzęta z chmur o połyskujących konturach, pasażerowie patrzący z zachwytem, rozległe niebo z wirującymi galaktykami, kosmiczne kolory (fiolety, błękity, róże), dramatyczne oświetlenie, mistyczna atmosfera.',
  },
  {
    id: '11',
    style: 'hyperrealism',
    prompt:
      'Zakapturzona, starożytna postać z twarzą owiniętą tkaniną pełną hieroglifów, na tle poligonalnego, lodowo-niebieskiego gradientu. Zniszczony materiał i pajęczyny podkreślają upływ czasu, a cyfrowa pustka kontrastuje z antycznym klimatem.',
  },
  {
    id: '12',
    style: 'hyperrealism',
    prompt:
      'Mały biało-różowy kotek wącha bioluminescencyjny, obcy kwiat w bajkowym lesie. Stylizacja w klimacie vintage, z efektem ziarnistości filmu, aberracją chromatyczną.',
  },
  {
    id: '13',
    style: 'hyperrealism',
    prompt:
      'Niesamowite tło, ekstremalne zbliżenie oszałamiającej cyberpunkowej hakerki z prostymi, dwukolorowymi włosami (czarne z neonowozielonymi pasemkami), w popkulturowych okularach. Ciemny makijaż oczu, czarna szminka, patrzy na niewidoczny ekran komputera. Na okularach odbicie neonowoniebieskiego, odwróconego tekstu ASCII na czarnym tle.',
  },
  {
    id: '15',
    style: 'anime',
    prompt:
      'Japońska wojowniczka w zbroi samurajskiej trzymająca katanę przed twarzą. Na ostrzu odbija się groźne oblicze starożytnego, mitycznego japońskiego demona.',
  },
  {
    id: '16',
    style: 'anime',
    prompt:
      'Zachwycające zdjęcie czerwonej pandy w gęstym bambusowym lesie Himalajów, jedzącej lody w letni dzień. Miękkie światło i żywe kolory podkreślają bujną zieleń oraz radosną ekspresję pandy, tworząc realistyczną i pogodną scenę.',
  },
  {
    id: '17',
    style: 'anime',
    prompt:
      'Epicki portret cybergejszy w neonowym kimonie z podwójną ekspozycją: nocna Shibuya i ogród botaniczny z bioluminescencyjnymi roślinami i unoszącymi się karpiami koi. Neonowe wzory, kwiaty, efekty świetlne i glitch art. Gejsza z kataną na plecach, neonowe włosy, cybernetyczne, galaktyczne oczy, surrealistyczne oświetlenie, żywe kolory i kinowy grading.',
  },
  {
    id: '18',
    style: 'pop-art',
    prompt:
      'Abstrakcyjny ekspresjonistyczny obraz łączący Pop Art i kubizm początku XX wieku, proste linie i formy, urocza twarz kota bez ciała, ciepłe kolory, zieleń, skomplikowane detale, hologram unoszący się w kosmosie. Żywa cyfrowa ilustracja, czarne tło, żywe, płaskie kolory, 2D, mocne linie, energetyczne pociągnięcia pędzla, odważne kolory, abstrakcyjne formy, ekspresyjny, emocjonalny.',
  },
  {
    id: '19',
    style: 'impressionism',
    prompt:
      'Postać w intensywnym kryzysie psychicznym, ręce przyłożone do głowy, rozpuszczające się w chaotycznej, wirującej czarnej masie. Ekspresywne, teksturowane pociągnięcia pędzla i ogniste tło tworzą ruch i zamęt, symbolizując wewnętrzną walkę. Silny kontrast między ciemną czernią a ciepłym tłem zwiększa intensywność, jakby cierpienie postaci wybuchało wokół niej. Ekspresyjny styl, kontrastowa paleta barw oraz surrealistyczne elementy ukazują psychiczne cierpienie, emocjonalne załamanie i wewnętrzny chaos. Nawiedzająca wizualizacja psychicznej walki z ludzką rozpaczą.',
  },
  {
    id: '20',
    style: 'hyperrealism',
    prompt: 'Ślimak ciągnący mini wózek dostawczy z napisem „Szybka Dostawa”. Środek miasta wokół chodzą ludzie.',
  },
  {
    id: '21',
    style: 'cyberpunk',
    prompt:
      'Czarne konie o płonących kopytach na tle dramatycznej eksplozji, oświetlone żywymi neonami. Futurystyczne wieżowce miasta w oddali, migające holograficzne reklamy w chaosie. Dym i iskry w powietrzu, konie galopują przez płonący chaos, symbolizując moc i ruch w elektryzującej miejskiej scenerii.',
  },
  {
    id: '22',
    style: 'anime',
    prompt: 'Rycerz na krewetce z siodłem, lancą i bronią, zamek, zbroja, fantasy',
  },
  {
    id: '23',
    style: 'hyperrealism',
    prompt:
      'Optyczne zbliżenie ziarenka piasku zawierającego miniaturowe miasto na opustoszałej plaży, z dymem unoszącym się z kominów małych domków, z widokiem moza w tle.',
  },
  {
    id: '24',
    style: 'hyperrealism',
    prompt:
      'Mała, zagubiona gumowa kaczuszka w zbliżeniu, surfująca ogromnymi falami w rurze, w stylu Kelly Slatera, ukazująca izolację i wrażliwość. Zachód słońca, ciepły złoty blask, pomarańczowe i różowe odcienie oświetlające ocean.',
  },
  {
    id: '25',
    style: 'surrealism',
    prompt: 'Salamandra, urocza, epicki świat, żywe kolory, szczegółowa, światło księżyca, pełnia, fioletowe oczy',
  },
  {
    id: '26',
    style: 'anime',
    prompt:
      'Mały humanoid z czaszką zamiast głowy, na mini motocyklu w stylu chibi. Czaszka duża, gładka, z dużymi czarnymi oczodołami i słodkim wyrazem. Motocykl z przesadzonymi proporcjami, dużymi reflektorami i masywnymi kołami, emitujący pomarańczowo-żółte płomienie. Ciemne tło z gwiazdami i brązowym gradientem. Styl uroczy i ostro, wyraźne kontury, żywe, ciepłe kolory. Dynamiczne oświetlenie skupione na reflektorze i płomieniach.',
  },
  {
    id: '27',
    style: 'surrealism',
    prompt:
      'Upiorna łuczniczka: półprzezroczysta postać na wzgórzu w mglistym lesie, z łukiem z widmowego światła, strzałami z eterycznym ogniem i zbroją zmieniającą się między kamieniem a mgłą.',
  },
  {
    id: '28',
    style: 'surrealism',
    prompt:
      'Unosząca się, odwrócona klepsydra, gdzie piasek to migoczące metaliczne motyle. Piasek płynie w górę, motyle trzepoczą skrzydłami, rozbijając się na cząsteczki gwiezdnego pyłu. Klepsydra unosi się w centrum rozległego, płynnego nieba, z promieniującymi falami światła. Cała scena skąpana w eterycznym świetle, z migoczącym, płynnym złotem w tle. Lekko pochyła perspektywa, dająca oszałamiający efekt.',
  },
  {
    id: '29',
    style: 'surrealism',
    prompt:
      'Urocza para Halloweenowych duchów w zaczarowanym cmentarzu. Jeden duch wręcza drugiemu różowy kwiat, który emanuje magicznym blaskiem. Otacza ich romantyczna, tajemnicza atmosfera, z delikatną mgłą i świetlistymi grobami.',
  },
  {
    id: '30',
    style: 'surrealism',
    prompt:
      'Zbliżenie od niskiego kąta, kot z eterycznym blaskiem, migocząca przezroczysta sierść, eteryczne smugi emitujące się z ciała. Księżycowa dachówka z panoramą miasta w tle. Fotografia z wysokim kontrastem, senny klimat, iryzujące niebieskie i fioletowe barwy z delikatnymi różami.',
  },
  {
    id: '31',
    style: 'surrealism',
    prompt:
      'Olbrzymi starożytny żółw z miastem na grzbiecie, skorupa pokryta bujnym lasem, wysokimi drzewami, wodospadami i ukrytą, mglistą wioską w zaroślach. Miasto z misternie zaprojektowanymi budynkami, mosty linowe łączące różne sekcje. Żółw powoli porusza się przez bezkresny ocean, fale delikatnie uderzające w jego boki. Niebo z ciepłymi odcieniami zachodu słońca i gwiazdami pojawiającymi się w zmierzchu. Magiczna, spokojna atmosfera, harmonia natury i cywilizacji, miękkie, otaczające światło podkreślające mistyczny klimat. Szeroka perspektywa, podkreślająca wielkość żółwia i drobne detale miasta.',
  },
  {
    id: '32',
    style: 'cyberpunk',
    prompt:
      'Postać wędrująca przez ciemny, mglisty las, nawiedzona przez duchowe zjawy. W tle sylwetka smoka z wibracyjną energią. Kontrast głębokiej czerni i jaskrawych różów, dynamiczna, efektowna kompozycja. Rozproszone cząsteczki światła, mistyczna atmosfera. Cyfrowa ilustracja łącząca elementy anime z futurystyczną estetyką, emanująca energią i intensywnością.',
  },
  {
    id: '33',
    style: 'hyperrealism',
    prompt:
      'Mała zebra z paskami z lepkiego brązowego masła orzechowego i płynnego winogronowego dżemu, stojąca na kuchennym blacie, w tle rozmyty bochenek chleba. Zebra ma ręcznie wykonany wygląd, z pociągnięciami noża w futrze.',
  },
  {
    id: '34',
    style: 'hyperrealism',
    prompt: 'Czaszka wykonana całkowicie z kwiatów',
  },
  {
    id: '35',
    style: 'hyperrealism',
    prompt:
      'Trójwymiarowy niebieski trójkąt z ludzkimi oczami i ustami, wyrażający smutek lub radość, realistyczne tekstury i oświetlenie, w bujnym lesie o świcie, promienie słońca przez gęstą roślinność, oświetlone mchem podłoże i małe dzikie kwiaty, ptaki i leśne stworzenia dodające życia, trójkąt płynnie wkomponowany w środowisko, kontrast między naturalnym pięknem lasu a antropomorficznym trójkątem.',
  },
  {
    id: '36',
    style: 'anime',
    prompt:
      'Czarny pies ukrywający się w krzakach, chłodna niebieska nocna paleta kolorów, miłość i uroczy, marzycielskie oczy, anime natura tapeta, ciemny kwiatowy las, bioluminescencyjne świecące kwiaty, gęsty bujny las nocą, mroczna winieta.',
  },
  {
    id: '37',
    style: 'anime',
    prompt:
      'Kreskówkowy portret Alberta Einsteina, uroczy chibi, prosty gradientowe tło, pełna postać, uśmiech, szczegółowe cechy twarzy. Na górze napis "Albert Einstein"',
  },
  {
    id: '38',
    style: 'anime',
    prompt:
      'Przygnębiony i płaczący pies. Obok leży pusty i czysty talerz.  Przed nim na powierzchni czystego talerza napis „404 Brak jedzenia”.',
  },
  {
    id: '39',
    style: 'anime',
    prompt:
      'Kobieta w codziennym ubraniu, trzymająca karton „10 PLN for one hug”, styl anime, 1 dziewczyna, długie czarne włosy, zawstydzona, rumieniąca się, nieśmiała, patrząca na widza.',
  },
  {
    id: '40',
    style: 'anime',
    prompt:
      'Las pełen świecących grzybów i latających świetlików, mgła snująca się wśród drzew, księżyc odbijający się w małym jeziorze.',
  },
  {
    id: '41',
    style: 'anime',
    prompt:
      'Pies w pełnej zbroi, siedzący dumnie na koniu, trzymający w łapie miniaturowy miecz. Nad nimi rozpościera się tęczowe niebo.',
  },
  {
    id: '42',
    style: 'anime',
    prompt:
      'Ogromne wieżowce z neonowymi światłami, unoszące się pojazdy, roboty spacerujące po ulicach i ludzie w futurystycznych strojach.',
  },
  {
    id: '43',
    style: 'anime',
    prompt: 'Kaktusy z ludzkimi twarzami, każdy gra na innym instrumencie, na pustyni przy zachodzie słońca.',
  },
  {
    id: '44',
    style: 'anime',
    prompt: "Kot w fartuchu kucharza, przygotowujący pizzę z tekstem: 'Makaroniarze, szykujcie fartuchy!'",
  },
  {
    id: '45',
    style: 'anime',
    prompt:
      'Małe, przytulne chatki pokryte śniegiem, blask świateł z okien, wokół choinki ozdobione lampkami, w tle majestatyczne góry.',
  },
  {
    id: '46',
    style: 'anime',
    prompt:
      'Kubek parującej herbaty, a na brzegu siedzi maleńka wróżka z błyszczącymi skrzydłami, mieszająca herbatę miniaturową łyżeczką.',
  },
  {
    id: '47',
    style: 'anime',
    prompt:
      'Kot w płaszczu i kapeluszu w stylu Sherlocka Holmesa, trzymający lupę, wpatrujący się w tajemniczy odcisk łapy na dywanie.',
  },
  {
    id: '48',
    style: 'anime',
    prompt: 'Ziemniak na polu bitwy, z tekstem: "When life gives you potatoes, make fries, but fight first!"',
  },
  {
    id: '49',
    style: 'anime',
    prompt:
      'Papuga w pirackim kapeluszu z przepaską na oku, siedząca na skarbie pełnym złotych monet i klejnotów, a za nią ocean i bezludna wyspa.',
  },
  {
    id: '50',
    style: 'anime',
    prompt:
      'Lama w kosmicznym kombinezonie, unosząca się w przestrzeni kosmicznej, z planetami i gwiazdami w tle, uśmiechająca się do widza.',
  },
  {
    id: '51',
    style: 'surrealism',
    prompt:
      'Ogromny zegar, który wydaje się topnieć jak wosk, rozlewa się na szczycie gór, a w tle chmury układają się w kształt ludzkich twarzy.',
  },
  {
    id: '52',
    style: 'surrealism',
    prompt:
      'Ogromna dłoń wynurzająca się z ziemi, a z jej środka wyrasta drzewo z kolorowymi, surrealistycznymi liśćmi przypominającymi motyle.',
  },
  {
    id: '53',
    style: 'surrealism',
    prompt:
      'Olbrzymia złota ryba unosząca się w powietrzu nad pustynią, z jej skrzeli wychodzą chmury jak dym z komina.',
  },
  {
    id: '54',
    style: 'surrealism',
    prompt:
      'Drewniany dom, unoszący się w niebo na setkach balonów w kształcie serc, a wokół niego latają surrealistyczne ptaki z ludzkimi oczami.',
  },
  {
    id: '55',
    style: 'surrealism',
    prompt: 'Kura stojąca na drabinie, która prowadzi do księżyca.',
  },
  {
    id: '56',
    style: 'surrealism',
    prompt:
      'Niebieskie fale oceanu płynące po niebie, zamiast chmur, a z wody wyłaniają się unoszące w powietrzu wieloryby.',
  },
  {
    id: '57',
    style: 'surrealism',
    prompt:
      'Porcelanowe filiżanki tańczące ze sobą w surrealistycznym stylu, unoszące się w powietrzu z parującą kawą, która tworzy spiralne wzory.',
  },
  {
    id: '59',
    style: 'surrealism',
    prompt:
      'Spiralne schody unoszące się w nieskończoności, prowadzące w pustkę, otoczone chmurami, które mają oczy obserwujące wędrowca.',
  },
  {
    id: '60',
    style: 'surrealism',
    prompt:
      'Krowa w eleganckim fraku gra na fortepianie, który unosi się na powierzchni oceanu, a dookoła niej tańczą meduzy w rytm muzyki.',
  },
  {
    id: '62',
    style: 'surrealism',
    prompt: 'Olbrzymia ludzka dłoń, na której końcach palców są otwarte oczy, a każdy z nich obserwuje inny krajobraz.',
  },
  {
    id: '63',
    style: 'surrealism',
    prompt:
      'Olbrzymia muszla leżąca na plaży, wewnątrz której widać miniaturowe surrealistyczne miasto z unoszącymi się nad nim statkami powietrznymi.',
  },
  {
    id: '64',
    style: 'surrealism',
    prompt:
      'Ludzka głowa otwarta na górze, a z jej wnętrza unoszą się surrealistyczne balony w różnych kształtach i kolorach, jakby odlatywały myśli.',
  },
  {
    id: '65',
    style: 'surrealism',
    prompt:
      'Surrealistyczny kot śpiący na chmurze złożonej z setek migoczących motyli, unoszących go w kierunku gwiazd.',
  },
  {
    id: '66',
    style: 'surrealism',
    prompt:
      'Ogromne słońce przypominające ludzkie oko, spoglądające z nieba, a jego promienie tworzą rozmyte obrazy wspomnień.',
  },
  {
    id: '67',
    style: 'hyperrealism',
    prompt:
      'Zbliżenie ludzkiej dłoni, na której znajduje się pojedyncza kropla wody. Każdy detal skóry — od linii papilarnych po mikroskopijne pory — jest oddany z niezwykłą precyzją. Kropla wody działa jak soczewka, odbijając odwrócony obraz pokoju z oknem i wpadającym przez nie światłem. Na dłoni widać delikatne ślady wilgoci wokół kropli, a światło podkreśla połysk wody, tworząc realistyczne refleksy. Tło jest rozmyte, skupiając całą uwagę na dłoni i kropli.',
  },
  {
    id: '68',
    style: 'cyberpunk',
    prompt: 'Futurystyczny rycerz na koniu z neonowym mieczem świetlnym, w tle cybernetyczne zamczysko.',
  },
  {
    id: '69',
    style: 'cyberpunk',
    prompt: 'Kosmiczny rekin unoszący się w przestrzeni międzygalaktycznej, z czarną dziurą w tle.',
  },
  {
    id: '70',
    style: 'cyberpunk',
    prompt: 'Polska wieś przyszłości: robokury na podwórku, holograficzne chaty i autonomiczne traktory.',
  },
  {
    id: '71',
    style: 'cyberpunk',
    prompt: 'Humanoid w stylu steampunk, trzymający filiżankę parującej kawy w otoczeniu gigantycznych zębatek.',
  },
  {
    id: '72',
    style: 'cyberpunk',
    prompt: 'Wędkarz w cybernetycznym kombinezonie łowiący złotą rybkę w basenie na środku miasta.',
  },
  {
    id: '73',
    style: 'cyberpunk',
    prompt: 'Gigantyczny mech w stylu japońskim walczący z ogromnym morskim potworem w zalanym mieście.',
  },
  {
    id: '74',
    style: 'cyberpunk',
    prompt: 'Zimowy krajobraz z futurystycznym miastem na horyzoncie, z gigantycznymi drzewami pokrytymi śniegiem.',
  },
  {
    id: '75',
    style: 'cyberpunk',
    prompt:
      'Cyberpunkowy stary wojownik siedzący na futurystycznym wózku inwalidzkim, otoczony tajemniczą mgłą przy ziemi, miękkie neonowe światło, kinowy nastrój, iryzująca czerń, żywe detale, toksyczny pył.',
  },
  {
    id: '76',
    style: 'cyberpunk',
    prompt: 'Kot w cybernetycznej zbroi na tle postapokaliptycznego świata',
  },
  {
    id: '77',
    style: 'cyberpunk',
    prompt: 'Czarodziejka w neonowym płaszczu rzucająca zaklęcia w formie holograficznych wzorów.',
  },
  {
    id: '78',
    style: 'cyberpunk',
    prompt: 'Robot grający na skrzypcach w opuszczonym teatrze, z księżycem wpadającym przez rozbite okno.',
  },
  {
    id: '79',
    style: 'cyberpunk',
    prompt: 'Pies astronauta na Marsie trzymający patyk i napis "Aport? Tu?"',
  },
  {
    id: '80',
    style: 'cyberpunk',
    prompt: 'Gigantyczna bańka mydlana unosząca miasto w chmurach, pełne latających maszyn.',
  },
  {
    id: '81',
    style: 'cyberpunk',
    prompt: 'Postać w kapturze stojąca na moście, patrząca na futurystyczne miasto pełne dronów i neonów.',
  },
  {
    id: '82',
    style: 'cyberpunk',
    prompt: 'Kurczak w hełmie rycerza, biegnący z flagą z napisem "Do boju!"',
  },
  {
    id: '83',
    style: 'cyberpunk',
    prompt: 'Futurystyczna biblioteka, w której książki są hologramami, a roboty pełnią rolę bibliotekarzy.',
  },
  {
    id: '84',
    style: 'cyberpunk',
    prompt: 'Olbrzymia meduza w kosmosie, która swoim światłem rozświetla ciemność międzygwiezdną.',
  },
  {
    id: '85',
    style: 'cyberpunk',
    prompt: 'Leniwiec w cyberpunkowych okularach popijający drinka z napisem "Wszystko na spokojnie".',
  },
  {
    id: '86',
    style: 'impressionism',
    prompt: 'Samochód zrobiony z arbuza stojący na polu pełnym truskawek.',
  },
  {
    id: '87',
    style: 'impressionism',
    prompt: 'Chleb tostowy, który leci w kosmos jako statek kosmiczny.',
  },
  {
    id: '88',
    style: 'impressionism',
    prompt: 'Kaktus noszący okulary przeciwsłoneczne i jedzący lody na pustyni.',
  },
  {
    id: '89',
    style: 'impressionism',
    prompt: 'Krzesło z nogami z marchewek stojące w lodowej jaskini.',
  },
  {
    id: '90',
    style: 'impressionism',
    prompt: 'Królik w kapeluszu magika wyciągający człowieka z cylindra.',
  },
  {
    id: '91',
    style: 'impressionism',
    prompt: 'Zegarek z tarczą w kształcie pizzy z salami jako wskazówkami.',
  },
  {
    id: '92',
    style: 'impressionism',
    prompt: 'Kostka Rubika zrobiona z kolorowych żelków na stole pełnym słodyczy.',
  },
  {
    id: '93',
    style: 'impressionism',
    prompt: 'Samowar, który gotuje wodę na szczycie ośnieżonej góry.',
  },
  {
    id: '94',
    style: 'impressionism',
    prompt: 'Kapelusz kowbojski zrobiony z liści kapusty.',
  },
  {
    id: '95',
    style: 'impressionism',
    prompt: 'Telewizor z ekranem w kształcie akwarium pełnego rybek.',
  },
  {
    id: '96',
    style: 'impressionism',
    prompt: 'Kanapa zrobiona z ciastek, z poduszkami w kształcie muffinek.',
  },
  {
    id: '97',
    style: 'impressionism',
    prompt: 'Latarnia uliczna w kształcie cukierka stojąca w środku lasu.',
  },
  {
    id: '98',
    style: 'impressionism',
    prompt: 'Lampa w kształcie gigantycznej żarówki, która świeci różnymi kolorami.',
  },
  {
    id: '99',
    style: 'impressionism',
    prompt: 'Zegar ścienny z tarczą w kształcie naleśnika z syropem klonowym.',
  },
  {
    id: '100',
    style: 'impressionism',
    prompt: 'Wózek inwalidzki z turbodoładowaniem i neonowymi światłami.',
  },
  {
    id: '101',
    style: 'impressionism',
    prompt: 'Lodówka wypełniona miniaturowymi meblami zamiast jedzenia.',
  },
  {
    id: '102',
    style: 'impressionism',
    prompt: 'Doniczka, z której wyrasta wielokolorowy parasol zamiast rośliny.',
  },
  {
    id: '103',
    style: 'impressionism',
    prompt: 'Wodospad spływający po gigantycznych kryształach, otoczony tęczą i kwiatami świecącymi w nocy.',
  },
  {
    id: '104',
    style: 'impressionism',
    prompt: 'Lazurowe jezioro, otoczone złotymi liśćmi jesieni i górami odbijającymi się w wodzie.',
  },
  {
    id: '105',
    style: 'pop-art',
    prompt:
      'Kobieta w stylu lat 60. z okularami przeciwsłonecznymi, z balonem do żucia w kształcie serca, na tle eksplodujących kolorów.',
  },
  {
    id: '106',
    style: 'pop-art',
    prompt: 'Pies w kurtce skórzanej, trzymający gitarę elektryczną, otoczony błyskawicami.',
  },
  {
    id: '107',
    style: 'pop-art',
    prompt: 'Banan jako rakieta startująca w kosmos na tle gwiazd i neonowych chmur.',
  },
  {
    id: '108',
    style: 'pop-art',
    prompt: 'Mężczyzna w kapeluszu detektywa, patrzący przez lupę na obraz w kropki.',
  },
  {
    id: '109',
    style: 'pop-art',
    prompt: 'Kubek kawy z parą unoszącą się w kształcie dymka z napisem: "Start a day with the power!"',
  },
  {
    id: '110',
    style: 'pop-art',
    prompt: 'Słuchawki unoszące się w powietrzu, z których wypływają kolorowe fale muzyki.',
  },
  {
    id: '111',
    style: 'pop-art',
    prompt: 'Kot w kasku astronauty.',
  },
  {
    id: '112',
    style: 'pop-art',
    prompt: 'Usta z neonową szminką, z kropelką miodu na dolnej wardze, otoczone cukierkowymi wzorami.',
  },
  {
    id: '113',
    style: 'pop-art',
    prompt: 'Rowerzysta na jednokołowym rowerze jadący po wielkiej winylowej płycie.',
  },
  {
    id: '114',
    style: 'pop-art',
    prompt: 'Popcorn wybuchający z wiadra, z każdą kulką w innym intensywnym kolorze.',
  },
  {
    id: '115',
    style: 'pop-art',
    prompt: 'Dłoń trzymająca telefon z ekranem, na którym widać emoji w stylu komiksowym.',
  },
  {
    id: '116',
    style: 'pop-art',
    prompt: 'Para retro-robotów tańcząca na dyskotece, z reflektorami rzucającymi tęczowe światła.',
  },
  {
    id: '117',
    style: 'pop-art',
    prompt:
      'Kobieta w stylu lat 60., z fryzurą typu bob i wyrazistą szminką w kolorze czerwonym, dmuchająca balon z gumy do żucia w kształcie serca, na tle żółtych promieni słonecznych i tekstu "BOOM!" w dymku komiksowym.',
  },
  {
    id: '118',
    style: 'pop-art',
    prompt:
      'Retro samochód w stylu lat 50., z otwartym dachem, wypełniony różowymi flamingami z okularami przeciwsłonecznymi, jadący przez pustynię w kolorowych, psychodelicznych barwach.',
  },
  {
    id: '119',
    style: 'pop-art',
    prompt:
      'Neonowy pies w kosmosie z kaskiem astronauty, unoszący się w grawitacji, z planetą Saturn w tle, wokół której krążą pierścienie.',
  },
  {
    id: '120',
    style: 'pop-art',
    prompt:
      'Słuchawki na tle wielkiego winylowego krążka, z kolorowymi falami dźwiękowymi rozchodzącymi się we wszystkie strony, i napis "MUSIC IS LIFE" w dużych, komiksowych literach.',
  },
  {
    id: '121',
    style: 'pop-art',
    prompt:
      'Retro robot w kolorach żółci, czerwieni i błękitu, trzymający kwiat w jednej ręce i dymek z napisem "LOVE IS FUTURISTIC!" w drugiej, na tle kolorowego zachodu słońca.',
  },
  {
    id: '122',
    style: 'pop-art',
    prompt:
      'Ogromny pączek z różową polewą i tęczową posypką, z którego środka wystrzeliwują iskry i dymek z napisem "Słodka rewolucja!" na tle błękitno-żółtych promieni.',
  },
  {
    id: '123',
    style: 'pop-art',
    prompt:
      'Superbohater w kostiumie w stylu komiksowym, z dużą literą "S" na piersi (oznaczającą "Słodycz"), trzymający wielki lizak niczym tarczę, otoczony przez latające cukierki w intensywnych kolorach.',
  },
  {
    id: '124',
    style: 'minimalism',
    prompt: 'Jedna cienka linia przedstawiająca palmę na jednolitym piaskowym tle.',
  },
  {
    id: '125',
    style: 'minimalism',
    prompt: 'Cienki, czarny okrąg na środku kremowego płótna.',
  },
  {
    id: '126',
    style: 'minimalism',
    prompt: 'Subtelny zarys prostego trójkąta symbolizującego górę, na monochromatycznym tle w odcieniu szarości.',
  },
  {
    id: '127',
    style: 'minimalism',
    prompt: 'Minimalistyczny kształt liścia, odrysowany w delikatnym odcieniu zieleni na kremowym tle.',
  },
  {
    id: '128',
    style: 'minimalism',
    prompt: 'Jedna kreska symbolizująca horyzont, umieszczona na białym tle.',
  },
  {
    id: '129',
    style: 'minimalism',
    prompt: 'Zarys małego żagla w geometrycznej formie, na błękitnym, jednolitym tle.',
  },
  {
    id: '130',
    style: 'minimalism',
    prompt: 'Jedno pionowe koło w pastelowym odcieniu różu, bez żadnych dodatkowych detali.',
  },
  {
    id: '131',
    style: 'minimalism',
    prompt: 'Minimalistyczna palma, przedstawiona jako cienka sylwetka na jednolitym piaskowym tle.',
  },
  {
    id: '132',
    style: 'minimalism',
    prompt: 'Mały okrąg, delikatnie wtopiony w monochromatyczne tło w odcieniu jasnej szarości.',
  },
  {
    id: '133',
    style: 'minimalism',
    prompt: 'Subtelna, pojedyncza fala w kolorze błękitu, na białym, niemal pustym tle.',
  },
  {
    id: '134',
    style: 'minimalism',
    prompt: 'Cienki, biały zarys samochodu na głębokim, granatowym tle.',
  },
  {
    id: '135',
    style: 'minimalism',
    prompt: 'Zarys kota w pastelowym kolorze czarnym, na delikatnym, jasnoszarym tle.',
  },
  {
    id: '136',
    style: 'minimalism',
    prompt: 'Minimalistyczny kontur psa w złotym odcieniu, na matowym czarnym tle.',
  },
  {
    id: '137',
    style: 'minimalism',
    prompt: 'Mały koci nosek w kolorze jasnego brązu, na mlecznym, kremowym tle.',
  },
  {
    id: '138',
    style: 'minimalism',
    prompt: 'Zarys kaktusa w kolorze jasnozielonym, na intensywnym tle w kolorze jasnego turkusu.',
  },
  {
    id: '139',
    style: 'minimalism',
    prompt: 'Prosty kontur książki w odcieniu ciemnego granatu, na tle w delikatnym odcieniu beżu.',
  },
  {
    id: '140',
    style: 'minimalism',
    prompt: 'Zarys piłki do koszykówki w ceglastym odcieniu pomarańczowym, na jasnoszarym tle.',
  },
  {
    id: '141',
    style: 'minimalism',
    prompt: 'Minimalistyczny wędkarz z cienką wędką w kolorze oliwkowym, na pastelowym błękitnym tle.',
  },
  {
    id: '142',
    style: 'minimalism',
    prompt: 'Zarys aparatu fotograficznego w jasnym odcieniu szarości, na głębokim czarnym tle.',
  },
  {
    id: '143',
    style: 'minimalism',
    prompt: 'Prosta sylwetka gitary w ciepłym brązie, na tle w kolorze piaskowego żółcienia.',
  },
  {
    id: '144',
    style: 'psychedelic',
    prompt:
      'Rozpływający się krajobraz z płynnymi, pastelowymi barwami, w którym drzewa zmieniają się w ludzkie twarze.',
  },
  {
    id: '145',
    style: 'psychedelic',
    prompt: 'Gigantyczne oko unoszące się nad pustynią, z tęczowym strumieniem płynącym z jego środka.',
  },
  {
    id: '146',
    style: 'psychedelic',
    prompt: 'Fraktalny świat pełen migoczących kształtów, które wydają się tańczyć w rytm niewidzialnej muzyki.',
  },
  {
    id: '147',
    style: 'psychedelic',
    prompt: 'Płonący feniks z piórami w kształcie kalejdoskopowych wzorów, unoszący się w kosmicznej przestrzeni.',
  },
  {
    id: '148',
    style: 'psychedelic',
    prompt: 'Jezioro, które odbija nocne niebo pełne wirujących mandali.',
  },
  {
    id: '149',
    style: 'psychedelic',
    prompt: 'Surrealistyczne miasto, gdzie budynki są zrobione z kwiatów w psychodelicznych kolorach.',
  },
  {
    id: '150',
    style: 'psychedelic',
    prompt: 'Lew o ciele z płomieni, z hipnotycznym wzrokiem i otaczającymi go geometrycznymi wzorami.',
  },
  {
    id: '151',
    style: 'psychedelic',
    prompt: 'Unoszący się most z płynnych tęczowych świateł, prowadzący donikąd.',
  },
  {
    id: '152',
    style: 'psychedelic',
    prompt: 'Twarz kobiety rozkładająca się na kawałki, które zmieniają się w galaktyki.',
  },
  {
    id: '153',
    style: 'psychedelic',
    prompt:
      'Głęboka dżungla, gdzie liście drzew są pokryte fluorescencyjnymi wzorami, a noc świeci w ultra intensywnych kolorach.',
  },
  {
    id: '154',
    style: 'psychedelic',
    prompt: 'Zakręcona ścieżka w powietrzu, która prowadzi przez psychodeliczną mgłę pełną oczu i ust.',
  },
  {
    id: '155',
    style: 'psychedelic',
    prompt: 'Sowa z kalejdoskopowymi skrzydłami siedząca na gałęzi wypełnionej płynącymi kolorami.',
  },
  {
    id: '156',
    style: 'psychedelic',
    prompt:
      'Rozbłyskująca fala, która zamienia się w milion drobnych psychodelicznych ryb, każda o unikalnych wzorach.',
  },
  {
    id: '157',
    style: 'psychedelic',
    prompt: 'Człowiek w kaftanie bezpieczeństwa, unoszący się w psychodelicznym tunelu pełnym neonowych wirów.',
  },
  {
    id: '158',
    style: 'psychedelic',
    prompt: 'Wąż o ciele złożonym z pływających lustrzanych odłamków, odbijających surrealistyczny krajobraz.',
  },
  {
    id: '159',
    style: 'psychedelic',
    prompt: 'Mandala, która powoli przeobraża się w oko patrzące prosto na obserwatora.',
  },
  {
    id: '160',
    style: 'psychedelic',
    prompt: 'Postać ludzka zrobiona z pulsujących, fluorescencyjnych kropek, które rozpływają się w przestrzeni.',
  },
  {
    id: '161',
    style: 'psychedelic',
    prompt: 'Motyl z metalicznymi, psychodelicznymi skrzydłami, unoszący się w powietrzu pełnym płynących kolorów.',
  },
  {
    id: '162',
    style: 'psychedelic',
    prompt: 'Chmura o formie gigantycznej głowy, z której wytryskują płynne tęcze tworzące surrealistyczny krajobraz.',
  },
  {
    id: '163',
    style: 'psychedelic',
    prompt: 'Koń z grzywą płomieni, biegnący przez pole psychodelicznych kwiatów, które migoczą neonowymi światłami.',
  },
  {
    id: '164',
    style: 'cubism',
    prompt: 'Nowoczesne miasto z wieżowcami i ulicami pełnymi ruchu, ukazane w abstrakcyjnych formach.',
  },
  {
    id: '165',
    style: 'cubism',
    prompt: 'Portret starszego mężczyzny z wyraźnymi geometrycznymi kształtami twarzy.',
  },
  {
    id: '166',
    style: 'cubism',
    prompt: 'Abstrakcyjny krajobraz górski z fragmentarycznymi szczytami i wielobarwnym niebem.',
  },
  {
    id: '167',
    style: 'cubism',
    prompt: 'Dynamiczna scena taneczna z postaciami w ruchu, złożonymi z wielokątnych form.',
  },
  {
    id: '168',
    style: 'cubism',
    prompt: 'Spokojne jezioro o zachodzie słońca, przedstawione za pomocą geometrycznych linii i kształtów.',
  },
  {
    id: '169',
    style: 'cubism',
    prompt: 'Ulica w deszczowy dzień z parasolami i odbiciami, zgeometryzowana w stylu kubistycznym.',
  },
  {
    id: '170',
    style: 'cubism',
    prompt: 'Kwiatowy ogród pełen różnorodnych kwiatów, przedstawiony w kolorowych, fragmentarycznych formach.',
  },
  {
    id: '171',
    style: 'cubism',
    prompt: 'Portret dziecka z wyrazistymi, geometrycznymi detalami twarzy i włosów.',
  },
  {
    id: '172',
    style: 'cubism',
    prompt: 'Scena z plaży z falami i parasolami, przedstawiona za pomocą wielokolorowych kształtów.',
  },
  {
    id: '173',
    style: 'cubism',
    prompt: 'Abstrakcyjna kompozycja muzyczna z instrumentami rozłożonymi w przestrzeni.',
  },
  {
    id: '174',
    style: 'cubism',
    prompt: 'Las pełen drzew o złożonych, geometrycznych koronach i sylwetkach.',
  },
  {
    id: '175',
    style: 'cubism',
    prompt: 'Kosmiczny krajobraz z planetami i gwiazdami w kubistycznym stylu.',
  },
  {
    id: '176',
    style: 'cubism',
    prompt: 'Stary most nad rzeką, przedstawiony z geometrycznymi detalami i fragmentarycznymi elementami.',
  },
  {
    id: '177',
    style: 'cubism',
    prompt: 'Scena z kawiarni pełnej ludzi, ukazana za pomocą zgeometryzowanych postaci i mebli.',
  },
  {
    id: '178',
    style: 'cubism',
    prompt: 'Abstrakcyjny portret muzyka grającego na skrzypcach, z geometrycznymi elementami instrumentu i twarzy.',
  },
  {
    id: '179',
    style: 'cubism',
    prompt: 'Miasto nocą z oświetlonymi budynkami i ulicznymi światłami, przedstawione w fragmentarycznych kształtach.',
  },
  {
    id: '180',
    style: 'cubism',
    prompt: 'Scena z targu pełna straganów i ludzi, ukazana za pomocą wielokątnych form i intensywnych kolorów.',
  },
  {
    id: '181',
    style: 'cubism',
    prompt: 'Abstrakcyjny widok na plażę z palmami i zachodem słońca, zgeometryzowany w stylu kubistycznym.',
  },
  {
    id: '182',
    style: 'cubism',
    prompt: 'Portret kobiety z rozłożonymi na części włosami i biżuterią w geometrycznych wzorach.',
  },
  {
    id: '183',
    style: 'cubism',
    prompt: 'Dynamiczna scena sportowa, np. piłkarze w ruchu, przedstawiona w fragmentarycznych formach.',
  },
];

type Inspiration = {
  id: string;
  style: InspirationStyle;
  prompt: string;
};

export type InspirationStyle = keyof typeof styles;

export const styles = {
  hiperrealism: 'Hiperrealizm',
  anime: 'Anime',
  surrealistic: 'Surrealizm',
  cyberpunk: 'Cyberpunk',
  impressionism: 'Impresjonizm',
  popArt: 'Pop-art',
  minimalism: 'Minimalizm',
  psychoDelic: 'Psychodelik',
} as const;

export const inspirationData: Inspiration[] = [
  {
    id: '1',
    style: 'hiperrealism',
    prompt: 'Tarantula wykonana z lodu, pokryta soplami, krocząca po wodzie, której kroki zamrażają powierzchnię.',
  },
  {
    id: '2',
    style: 'hiperrealism',
    prompt:
      'Pół-realisticzny, świecący demoniczny czajnik z złowrogimi oczami, wiszący na łańcuchu nad ogniskiem w kominku. Z dynamicznym oświetleniem, płytką głębią ostrości i wysoką rozdzielczością.',
  },
  {
    id: '3',
    style: 'hiperrealism',
    prompt: 'Zbliżenie na płaczącego kota trzymającego w pyszczku płaczącą mysz.',
  },
  {
    id: '4',
    style: 'hiperrealism',
    prompt:
      'Słodki, kawaii stworek w kształcie połówki awokado z motylim skrzydłem, dużymi oczami i ostrym nosem, unoszący się nad zielonymi polami w wietrzną, pomarańczowo-różową scenerię zachodzącego słońca.',
  },
  {
    id: '5',
    style: 'hiperrealism',
    prompt:
      'Zbliżenie na ogromne smocze oko i postać w czarnej szacie w surrealistycznej, mglisto-śnieżnej atmosferze.',
  },
  {
    id: '6',
    style: 'hiperrealism',
    prompt:
      'Realistyczna scena portu umieszczona w wannie, wyglądająca jak miniaturowy model. W porcie są statki, dźwigi, kontenery i doki, a woda w wannie przypomina spokojne morze. Na brzegu widoczne są drobne łazienkowe przedmioty, które podkreślają surrealizm tej scenerii.',
  },
  {
    id: '7',
    style: 'hiperrealism',
    prompt:
      'Wojownik w skórzanym pancerzu, z hełmem ozdobionym rogami, spogląda w niebo, gdzie nad wioską unosi się smok.',
  },
  {
    id: '8',
    style: 'hiperrealism',
    prompt:
      'Zbliżenie na usta kobiety w monochromatycznym ujęciu, z wyjątkiem jej ust, które świecą intensywnym, żółtym blaskiem. Delikatne, eteryczne żółte fale dymu unoszą się z jej ust, łagodnie rozprzestrzeniając się w powietrzu. Reszta obrazu jest w czerni i bieli, co tworzy silny kontrast z żywym żółtym blaskiem, podkreślając surrealistyczną, senną atmosferę sceny.',
  },
  {
    id: '9',
    style: 'hiperrealism',
    prompt: 'Puchaty kociak owinięty w tortille, z kawałkami mięsa i warzywami, trzymany w dłoniach.',
  },
  {
    id: '10',
    style: 'hiperrealism',
    prompt:
      'Pociąg ozdobiony kwitnącymi kwiatami, zwiewne zwierzęta z chmur o połyskujących konturach, pasażerowie patrzący z zachwytem, rozległe niebo z wirującymi galaktykami, kosmiczne kolory (fiolety, błękity, róże), dramatyczne oświetlenie, mistyczna atmosfera.',
  },
  {
    id: '11',
    style: 'hiperrealism',
    prompt:
      'Zakapturzona, starożytna postać z twarzą owiniętą tkaniną pełną hieroglifów, na tle poligonalnego, lodowo-niebieskiego gradientu. Zniszczony materiał i pajęczyny podkreślają upływ czasu, a cyfrowa pustka kontrastuje z antycznym klimatem.',
  },
  {
    id: '12',
    style: 'hiperrealism',
    prompt:
      'Szczegółowy, mistrzowski, profesjonalny obraz w odważnych kolorach: mały biało-różowy kotek wącha bioluminescencyjny, obcy kwiat w bajkowym lesie. Stylizacja w klimacie vintage, z efektem ziarnistości filmu, aberracją chromatyczną.',
  },
  {
    id: '13',
    style: 'hiperrealism',
    prompt:
      'Niesamowite tło, ekstremalne zbliżenie oszałamiającej cyberpunkowej hakerki z prostymi, dwukolorowymi włosami (czarne z neonowozielonymi pasemkami), w popkulturowych okularach. Ciemny makijaż oczu, czarna szminka, patrzy na niewidoczny ekran komputera. Na okularach odbicie neonowoniebieskiego, odwróconego tekstu ASCII na czarnym tle.',
  },
  {
    id: '14',
    style: 'hiperrealism',
    prompt:
      'Zielone, grunge’owe tło, widok od dołu w pełnej wysokości. Kobieta w luksusowych zielonych gumowych kaloszach, krótkich szortach z falbanami, z pięknymi, jasnozielonymi tulipanami wystającymi z wąskich butów. Kwiaty w kaloszach, w stylu boho D',
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
];

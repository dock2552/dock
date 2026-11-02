import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} from 'docx';

export async function generateWordDocument(): Promise<Blob> {
  const tableBorderNone = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'ПОВНИЙ АЛГОРИТМ ТА ЛОГІКА ТОРГІВЛІ DEMENTOR CME',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Кластерний аналіз, Footprint, Об\'ємний профіль (Volume Profile), Дельта та ризик-менеджмент',
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Автор стратегії: ', bold: true }),
              new TextRun('Dementor (@Dem6ntor / dementor.cme)\n'),
              new TextRun({ text: 'Ринки: ', bold: true }),
              new TextRun('CME Bitcoin Futures (BTC1!), ETH, Gold (XAU/USD), Altcoins\n'),
              new TextRun({ text: 'Дата складання регламенту: ', bold: true }),
              new TextRun(new Date().toLocaleDateString('uk-UA')),
            ],
            spacing: { after: 400 },
          }),

          // Section 1
          new Paragraph({
            text: '1. ФУНДАМЕНТАЛЬНА ФІЛОСОФІЯ ТРЕЙДЕРА DEMENTOR',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '«Більшість трейдерів грають на емоціях і надіях, маркет-мейкер грає на страху, а системний трейдер грає на математичних ймовірностях та об\'єктивних даних біржі».',
                italics: true,
                bold: true,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Ключовий постулат системи Dementor полягає в тому, що ціна на фінансових ринках рухається не через лінії тренду чи індикаторні осцилятори, а внаслідок постійного аукціону між лімітними та ринковими ордерами. Основні принципи:\n' +
                '1. Ринкові ордери штовхають ціну (агресивні покупки Market Buy та продажі Market Sell).\n' +
                '2. Лімітні ордери стримують та розвертають ціну (айсберги та пасивна ліквідність великих фондів).\n' +
                '3. Великі гравці ніколи не купують за ринковою ціною в повітрі — їм потрібна контр-ліквідність (стоп-лоси роздрібних трейдерів).\n' +
                '4. Звичайна свічка показує лише OHLC. Кластерний графік (Footprint) показує реальну кількість куплених та проданих контрактів на кожному центі руху.'
              ),
            ],
            spacing: { after: 300 },
          }),

          // Section 2
          new Paragraph({
            text: '2. СЕКРЕТ ТОРГОВОГО АЛГОРИТМУ ТА ЛОГІКА РИНКУ',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Алгоритм Dementor побудований як сувора п\'ятиетапна послідовність. Якщо хоча б одна ланка відсутня — угода скасовується:\n\n' +
                'Етап 1: HTF Контекст (1D / 4H) — Визначення ключових рівнів ліквідності, зон Value Area минулих днів/тижнів, незакритих Naked POC та гепів на ф\'ючерсах CME.\n' +
                'Етап 2: Маніпуляція (Sweep) — Прокол ключового екстремуму або пулу ліквідності (EQH/EQL). Залучення натовпу в хибний пробій та збиття стопів.\n' +
                'Етап 3: Кластерне поглинання (Absorption на Footprint) — У хвості свічки фіксується сплеск агресивних ринкових покупок (або продажів), які вперлися в щільну лімітну стінку. Свічка закривається проти агресора.\n' +
                'Етап 4: Підтвердження дельтою (CVD Divergence) — Дивергенція кумулятивної дельти. Ціна оновила екстремум, але дельта не підтверджує рух (виснаження ринкових ордерів).\n' +
                'Етап 5: Вхід на поверненні (Acceptance & Retest) — Вхід здійснюється тільки після закриття свічки назад у робочий діапазон на ретесті зламаної локальної структури (CHoCH) на 5m/1m.'
              ),
            ],
            spacing: { after: 300 },
          }),

          // Section 3
          new Paragraph({
            text: '3. ТАБЛИЦЯ МУЛЬТИТАЙМФРЕЙМОВОГО АНАЛІЗУ',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Таймфрейм', bold: true })] })],
                    borders: tableBorderNone,
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Функція в системі', bold: true })] })],
                    borders: tableBorderNone,
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Ключові параметри та рівні', bold: true })] })],
                    borders: tableBorderNone,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1D (Daily)')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Макро-тренд та фаза ринку (баланс/імпульс)')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('CME Gaps, Weekly POC, VAH/VAL місяця, глобальні пули')] , borders: tableBorderNone }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4H')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Swing-структура та основні діапазони')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Денні Naked POC, відкритий інтерес (Open Interest)')], borders: tableBorderNone }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1H / 15m')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Сесійний контекст (Азія, Лондон, Нью-Йорк)')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Asia High/Low, Previous Day High/Low, Single Prints')], borders: tableBorderNone }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('5m / 1m (Footprint)')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Точка виконання ордера (Execution)')], borders: tableBorderNone }),
                  new TableCell({ children: [new Paragraph('Кластери Bid/Ask, Stacked Imbalance >300%, Дельта свічки')], borders: tableBorderNone }),
                ],
              }),
            ],
          }),

          // Section 4: Setups
          new Paragraph({
            text: '4. ЧОТИРИ СИСТЕМНІ СЕТАПИ DEMENTOR',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
          }),
          new Paragraph({
            text: 'СЕТАП №1: Liquidity Sweep + Footprint Absorption (Шорт/Лонг)',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Умова: ', bold: true }),
              new TextRun('Ціна знімає важливий максимум (EQH або Asia High). На самому піку виникає довга тінь свічки 5m.\n'),
              new TextRun({ text: 'Кластери: ', bold: true }),
              new TextRun('На вершині свічки в хвості зосереджений величезний об\'єм за Ask (ринкові покупки), але тіло закривається червоним під рівнем пробою (пастка покупців).\n'),
              new TextRun({ text: 'Вхід: ', bold: true }),
              new TextRun('При закритті свічки під рівнем або на ретесті нижньої межі.\n'),
              new TextRun({ text: 'Стоп-лос: ', bold: true }),
              new TextRun('За максимальну точку тіні свічки зняття ліквідності.\n'),
              new TextRun({ text: 'Тейк-профіти: ', bold: true }),
              new TextRun('TP1 (40% об\'єму): POC поточної сесії (стоп переводиться в беззбиток). TP2 (30%): середина діапазону. TP3 (30%): протилежний пул ліквідності.'),
            ],
            spacing: { after: 250 },
          }),

          new Paragraph({
            text: 'СЕТАП №2: Value Area Rotation (Ротація всередині зони вартості)',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Умова: ', bold: true }),
              new TextRun('Ринок у флеті (балансі). Ціна короткочасно виходить за межу Value Area Low (VAL) або High (VAH) — так звана Девіація (Deviation).\n'),
              new TextRun({ text: 'Кластери & Дельта: ', bold: true }),
              new TextRun('Бичача дивергенція дельти на виході за VAL. Повернення наступною свічкою всередину Value Area.\n'),
              new TextRun({ text: 'Вхід: ', bold: true }),
              new TextRun('На закритті свічки всередині зони вартості або на дзеркальному тесті VAL зверху в лонг.\n'),
              new TextRun({ text: 'Цілі: ', bold: true }),
              new TextRun('TP1: Point of Control (POC). TP2: протилежна межа Value Area High (VAH). R:R від 1:3 до 1:5.'),
            ],
            spacing: { after: 250 },
          }),

          new Paragraph({
            text: 'СЕТАП №3: CME Gap Fill + Naked POC',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Умова: ', bold: true }),
              new TextRun('Ціна прямує на закриття цінового розриву вихідного дня на ф\'ючерсах CME (BTC1!).\n'),
              new TextRun({ text: 'Синхронізація: ', bold: true }),
              new TextRun('На межі гепу знаходиться непротестований Naked POC попереднього тижня.\n'),
              new TextRun({ text: 'Вхід: ', bold: true }),
              new TextRun('При досягненні nPOC та формуванні кластерного поглинання береться позиція на відскок від гепу або вхід у напрямку перекриття гепу як цілі.'),
            ],
            spacing: { after: 250 },
          }),

          new Paragraph({
            text: 'СЕТАП №4: CVD Divergence + Change of Character (Злам структури)',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Умова: ', bold: true }),
              new TextRun('Ціна формує Higher High, а кумулятивна дельта демонструє виразний Lower High. Повний розсинхрон ціни та ринкового об\'єму.\n'),
              new TextRun({ text: 'Підтвердження: ', bold: true }),
              new TextRun('Імпульсний пробій останнього Higher Low на 5m свічкою з Stacked Selling Imbalances (3 поспіль кластери червоного дисбалансу).\n'),
              new TextRun({ text: 'Вхід: ', bold: true }),
              new TextRun('На ретесті рівня зламу з системним коротким стопом за свічку зламу.'),
            ],
            spacing: { after: 300 },
          }),

          // Section 5: Risk & Psychology
          new Paragraph({
            text: '5. РИЗИК-МЕНЕДЖМЕНТ ТА РОЗБІР ГОЛОВНОЇ ПОМИЛКИ',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Помилка №1 з відео Dementor: «Усереднення збиткової позиції без стоп-лосу (доливка в мінус)».',
                bold: true,
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Коли ринок переходить з балансу в імпульсний тренд, усереднення гарантовано призводить до ліквідації депозиту. Залізні правила:\n' +
                '1. Ризик на 1 угоду суворо 1% (максимум 2% для консервативного скальпінгу).\n' +
                '2. Стоп-лос виставляється ОДНОЧАСНО з ордером входу в біржовий стакан.\n' +
                '3. Ніколи не пересувати стоп-лос далі від ціни!\n' +
                '4. Плече — це НЕ ступінь ризику, а коефіцієнт маржинального забезпечення. Розмір позиції розраховується від відстані до стопу в доларах:\n' +
                '   Розмір позиції ($) = (Депозит * Ризик %) / (Відстань до стоп-лосу % / 100)\n' +
                '5. Переведення в БЕЗЗБИТОК: відбувається СУВОРО після фіксації першої частини прибутку (TP1 40-50%). До цього стоп стоїть на первинному місці.'
              ),
            ],
            spacing: { after: 300 },
          }),

          // Section 6: Checklist
          new Paragraph({
            text: '6. ЩОДЕННИЙ ПРЕ-МАРКЕТ ЧЕК-ЛІСТ ТРЕЙДЕРА',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                '[ ] 08:00 UTC: Аналіз ф\'ючерсів CME (наявність гепів, закриття п\'ятниці).\n' +
                '[ ] 08:15 UTC: Визначення індексу долара DXY та кореляції.\n' +
                '[ ] 08:30 UTC: Нанесення рівнів PDH, PDL, Daily POC, VAH, VAL на графік BTC/ETH/XAU.\n' +
                '[ ] 08:45 UTC: Виділення меж азійської сесії (Asia High / Asia Low).\n' +
                '[ ] Лондон/Нью-Йорк: Очікування зняття ліквідності (НЕ відкривати угоди до маніпуляції!).\n' +
                '[ ] Перевірка Footprint: наявність поглинання та Stacked Imbalances.\n' +
                '[ ] Розрахунок лоту під 1% ризику -> Виставлення SL + сітки TP1, TP2, TP3.\n' +
                '[ ] Досягнення TP1 -> Переведення стоп-лосу в Безубиток (BE).'
              ),
            ],
            spacing: { after: 300 },
          }),

          new Paragraph({
            text: 'ДОКУМЕНТ СТВОРЕНО НА ОСНОВІ 17 ВІДЕО-МАТЕРІАЛІВ КАНАЛУ @Dem6ntor.',
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

# Text for Everyone

## Описание
Этот проект направлен на упрощение сложных текстов, чтобы сделать их доступными для людей с ментальными особенностями, пожилых людей и тех, кто плохо знает русский язык. Проект также поддерживает версии для слабовидящих и озвучивание текстов.

## Структура проекта

### `text_for_everyone`
Эта папка содержит стартовую страницу проекта.

#### Содержимое:
- `index.html` - основная HTML-страница.
- `styles.css` - стили для стартовой страницы.
- `script.js` - скрипты для функционала стартовой страницы.

### `data`
Эта папка содержит все изображения, которые используются на сайте.

#### Содержимое:
- `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg` - изображения для слайдера и других разделов.
- `eye-icon.png`, `sound_icon.png`, `small.jpg`, `medium.jpg`, `large.jpg`, `bl_wh.jpg`, `wh_bl.jpg`, `bl_sin.jpg`, `brwn.jpg`, `bl_green.jpg`, `play.png`, `stop.png`, `restart.png` - иконки и изображения для функционала доступности и управления звуком.

### `accessibility`
Эта папка содержит JavaScript и CSS файлы для интерфейса слабовидящих.

#### Содержимое:
- `accessibility.js` - скрипты для функционала доступности.
- `accessibility.css` - стили для интерфейса слабовидящих.

### `input_text`
Эта папка содержит вторую страницу проекта, предназначенную для загрузки документов.

#### Содержимое:
- `proposal.html` - HTML-страница для загрузки документов.
- `proposal.css` - стили для страницы загрузки документов.
- `proposal.js` - скрипты для страницы загрузки документов.

### `output_llama`
Эта папка содержит страницу с полученным текстом от Ламмы (нейросетевой модели).

#### Содержимое:
- `output_text.html` - HTML-страница с результатами обработки текста.
- `styles_output.css` - стили для страницы с результатами.
- `output.js` - скрипты для страницы с результатами.



## Использование

1. Перейдите на стартовую страницу (`text_for_everyone/index.html`).
2. Используйте верхнее меню для навигации по разделам.
3. На стартовой странице вы можете перейти на страницу загрузки документов через меню или кнопку "Упростить текст".
4. На странице загрузки документов (`input_text/proposal.html`) загрузите необходимый документ.
5. После обработки, результаты будут показаны на странице с полученным текстом (`output_llama/output_text.html`).




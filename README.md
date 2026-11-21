# Convertir CSV/Excel a JSON

Convierte archivos CSV o Excel a JSON, o un JSON a CSV, gratis y sin subir el archivo a ningún servidor.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Pasar datos de una hoja de cálculo a un formato que entienda tu código, o al revés, suele significar copiar y pegar celda por celda o escribir un script para una tarea de un solo uso. Esta herramienta convierte en ambos sentidos: sube un archivo CSV o Excel y lo transforma en un arreglo JSON listo para pegar en tu proyecto, o pega un JSON y descárgalo como CSV para abrirlo en Excel o Google Sheets. Todo el procesamiento ocurre dentro de tu navegador, así que el archivo nunca sale de tu equipo.

**Cuándo te sirve:**

- Un desarrollador recibe una exportación en CSV de un cliente y necesita convertirla a JSON en minutos para poblar una base de datos de prueba o simular la respuesta de una API.
- Un analista de datos recibe la respuesta JSON de una API de analítica y la convierte a CSV para abrirla en Excel, filtrar columnas y armar un gráfico sin escribir una sola línea de código.
- Alguien que arma un pequeño sitio o una app recibe una hoja de cálculo con el catálogo de productos y la convierte a JSON para cargarla directamente como datos estáticos del proyecto.

## Cómo se usa

1. **Elige el sentido de la conversión.** Selecciona si quieres convertir un archivo a JSON o un JSON a CSV con el interruptor en la parte superior. Cada modo tiene su propia zona de carga o cuadro de texto, así que no hay que buscar la opción escondida en un menú.
2. **Carga el archivo o pega el JSON.** En el primer modo, arrastra tu archivo CSV, XLSX o XLS a la zona de carga. En el segundo, pega directamente el arreglo JSON en el cuadro de texto. La conversión se ejecuta al instante, sin botón de procesar que te haga esperar.
3. **Descarga el resultado.** Revisa la vista previa de las primeras filas o del JSON generado y descarga el archivo: un .json si convertiste desde una hoja de cálculo, o un .csv si convertiste desde JSON. El archivo original no se modifica, así que puedes ajustar los datos y repetir el proceso las veces que haga falta.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-csv-json.git
cd herramienta-csv-json
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/csv-json/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Mis archivos se suben a algún servidor?**  
No. Tanto la lectura del CSV o Excel como la generación del JSON, y el proceso inverso, ocurren enteramente en tu navegador con las bibliotecas que corren en tu propio equipo. El archivo nunca viaja a un servidor nuestro ni de terceros, y no queda ninguna copia guardada cuando cierras la pestaña.

**¿Convierte todas las hojas de un archivo Excel?**  
No: la herramienta lee únicamente la primera hoja del libro. Si tu archivo de Excel tiene varias pestañas, solo se convertirá a JSON la que aparece primero. Si necesitas las demás, tendrás que separarlas en archivos distintos antes de convertirlas.

**¿Puedo convertir un JSON con datos anidados a CSV?**  
Funciona bien con datos planos, es decir filas y columnas simples. Si tu JSON tiene un campo que a su vez es un objeto o un arreglo, por ejemplo una dirección con calle y ciudad dentro de un mismo campo, el CSV no lo va a aplanar de forma prolija, porque el formato CSV en sí mismo no está pensado para representar estructuras anidadas.

**¿Qué formatos de archivo acepta para convertir a JSON?**  
Acepta archivos CSV, XLSX y XLS. La primera fila del archivo se usa como encabezado y se convierte en las claves de cada objeto del arreglo JSON resultante, así que conviene que esa fila tenga nombres de columna claros antes de subir el archivo.

**¿Es gratis y sin límite de uso?**  
Sí, es gratis y no impone límite de archivos ni de tamaño, más allá de lo que tu propio navegador pueda procesar. No pide cuenta, no pide correo y no agrega marca de agua a los archivos descargados, porque no hay servidor detrás que costear con cada conversión.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.

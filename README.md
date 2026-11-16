# Presentations

My [reveal.js](https://revealjs.com/) slide presentations, published with GitHub Pages.

**Browse the presentations:** https://chapuisk.github.io/Presentations/

## Presentation list

No presentations have been published yet.

<!-- Add a row below for each published deck and remove the message above. -->
| Presentation | Date | Slides |
| --- | --- | --- |

## Add a presentation

1. Copy the finished deck into `site/<deck-slug>/`, with `index.html` as its entry point.
   Use a URL-friendly slug such as `my-talk`. Include all required reveal.js files,
   themes, plugins, images, and other assets from your dtslide-based deck.
   Only files inside `site/` are published; do not include secrets or private notes.
2. Use relative asset paths (for example, `./dist/reveal.js` and `./images/diagram.svg`),
   not root-relative paths such as `/dist/reveal.js`. GitHub Pages serves this
   repository under `/Presentations/`, not at the domain root.
3. Add a row to the table above:

   ```markdown
   | My talk | YYYY-MM-DD | [View slides](https://chapuisk.github.io/Presentations/my-talk/) |
   ```

4. Add a matching link to the list in `site/index.html`:

   ```html
   <li><a href="./my-talk/">My talk</a> — YYYY-MM-DD</li>
   ```

   Remove the “No presentations have been published yet” message there when adding
   the first deck.
5. Preview locally from the repository root:

   ```sh
   python3 -m http.server 8000 --directory site
   ```

   Open http://localhost:8000/ and check the deck, navigation, and assets.
6. Commit the files and merge into `main`. The Pages workflow deploys the site.
   The deck will be available at
   `https://chapuisk.github.io/Presentations/<deck-slug>/`.

## Enable GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, set **Source**
to **GitHub Actions**. Once these changes are on `main`, the
**Deploy presentations to GitHub Pages** workflow publishes `site/` on each push
to `main`. You can also run it manually from the **Actions** tab, selecting `main`.
The workflow's deployment environment links to the published site.

There is no build step: decks must be ready-to-serve HTML with their assets.

## Credits

The presentations are based on the **dtslide** template and use **reveal.js**.
GitHub Copilot helped me build the decks; **all slide content is authored by me**.
Retain the template and bundled libraries' license notices when adding decks.
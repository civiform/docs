# Frontend Development

## Everything is mostly Java.

_Our frontend is weird._\
_Nope! No two ways about it._\
_Just... it's really weird._

**The HTML?** Java ([J2HTML](https://j2html.com))\
**The CSS?** Java (Class wrappers around [Tailwind](https://tailwindcss.com) styles.)\
**The JavaScript?** Well, okay... that part isn't Java. But, JavaScript usage is pretty discouraged for CiviForm.

If you already know Java, you're probably going to be pretty comfortable. If you don't there are still plenty of places where you can help.

## Client-side code (TypeScript)

CiviForm has some amount of client-side code used for adding dynamic behavior to
the app. At the moment no XHR/AJAX is done through client-side code, all network
interactions are done via HTML forms which are server-side rendered.

We use TypeScript for client-side code. It is a very popular alternative to JavaScript that adds type safety and improves developer experience. The code is located in [server/app/assets/javascripts](https://github.com/civiform/civiform/tree/main/server/app/assets/javascripts).

See [TypeScript best practices](development-standards.md#typescript-code).

For testing see [TypeScript unit testing](testing.md#typescript-unit-tests).


### Code organization

There are no strict rules around TypeScript code organization. This codebase is
relatively small so use your own judgement. If you are adding new functionality
and that functionality is 100+ lines and focuses on a specific feature -
consider adding it as a separate file.

### Bundling

Client-side code is bundled into a few bundle JS files. Only one bundle should
be loaded on any given CiviForm page. Each bundle is built from a file ending
with `_entry_point.ts`. Entry point file imports a subset of TS files and calls
corresponding `init()` functions. At the moment we have the following bundles:

* admin.bundle.js - loaded on admin pages (CiviForm admin, Program admin). Entry
  point: [admin_entry_point.ts](https://github.com/civiform/civiform/blob/main/server/app/assets/javascripts/admin_entry_point.ts)
  .
* applicant.bundle.js - loaded on applicant pages. Should be kept small. Entry
  point: [applicant_entry_point.ts](https://github.com/civiform/civiform/blob/main/server/app/assets/javascripts/applicant_entry_point.ts)
  .

Bundling is done using [webpack](https://webpack.js.org/). Webpack config is [webpack.config.js](https://github.com/civiform/civiform/blob/main/server/webpack.config.js).

### Prototypes (HTML and Tailwind CSS)

If you're really comfortable in HTML and CSS, the best place to get started is through developing tailwind prototypes. You can view some examples of tailwind component [here](https://tailwindcomponents.com/components). Feel free to implement a mock or just start from scratch and roll your own. [Tailwind Play](https://play.tailwindcss.com) is an excellent resource for creating and sharing quick tailwind mocks in your browser. We've also provided links to some of our Tailwind prototypes as a springboard for you to get started.

#### Tailwind Play Examples

TODO

### Implementation

Once we've got Tailwind prototypes in place, it all comes down to the implementation phase. Do you like slinging Java code? Well have we got a job for you! Convert the DOM structure to J2HTML then use the Tailwind prototypes as a reference for the CSS.

#### Sample implementation

[This Tailwind example](https://play.tailwindcss.com/ZVevfWqRdz)

```
<div class="absolute transform -translate-x-1/2 left-1/2">
  <div class="relative flex flex-row bg-red-400 border border-red-500 bg-opacity-90 px-2 py-1 mb-4 text-gray-700 top-4 rounded-sm shadow-lg">
    <div class="flex-none pr-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="inline-block h-6 w-6" fill="currentColor">
        <path fill-rule="evenodd" 
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
    </div>
    <span>Do not enter actual or personal data in this demo site.</span>
    <span class="font-bold pl-6 opacity-40 hover:opacity-100">x</span>
  <div>
</div>
```

#### Becomes this Java code

```
    ContainerTag wrappedWarningSvg =
        div()
            .withClasses(Styles.FLEX_NONE, Styles.PR_2)
            .with(
                Icons.svg(Icons.WARNING_SVG_PATH, 20)
                    .attr("fill-rule", "evenodd")
                    .withClasses(Styles.INLINE_BLOCK, Styles.H_6, Styles.W_6));
    ContainerTag messageSpan = span(BANNER_TEXT);
    ContainerTag dismissButton =
        div("x")
            .withId("warning-message-dismiss")
            .withClasses(
                Styles.FONT_BOLD,
                Styles.PL_6,
                Styles.OPACITY_40,
                Styles.CURSOR_POINTER,
                StyleUtils.hover(Styles.OPACITY_100));

    return div(wrappedWarningSvg, messageSpan, dismissButton)
        .withId("warning-message")
        .withClasses(
            Styles.ABSOLUTE,
            Styles.FLEX,
            Styles.FLEX_ROW,
            Styles.BG_RED_400,
            Styles.BORDER_RED_500,
            Styles.BG_OPACITY_90,
            Styles.MAX_W_MD,
            Styles.PX_2,
            Styles.PY_2,
            Styles.TEXT_GRAY_700,
            Styles.TOP_2,
            Styles.ROUNDED_SM,
            Styles.SHADOW_LG,
            Styles.TRANSFORM,
            Styles._TRANSLATE_X_1_2,
            Styles.LEFT_1_2,
            Styles.HIDDEN);
  }
```

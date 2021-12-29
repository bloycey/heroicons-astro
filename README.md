# Heroicons for Astro

This is a fork of [Heroicons](https://github.com/tailwindlabs/heroicons) adapted for [Astro](https://astro.build/).

## Usage

First, in the root of your Astro project, run:

```
npm i heroicons-astro
```

Then, in any component you can import the `Heroicon.astro` like this:

```js
---
import Icon from "heroicons-astro/Heroicon.astro";
---

// PROPS
// iconCode: Use the kebab-case icon code from the official website: https://heroicons.com/
// iconStyle: Accepts either "outline" or "solid" (default is "outline")
// customClasses: Accepts classnames as a string. E.g. "h-6 w-6"

<Icon iconCode="beaker" iconStyle="outline" customClasses="h-6 w-6" />

```

const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default

async function buildIcons() {
	// let outDir = `./astro/${type}`
	// await fs.mkdir(outDir, { recursive: true })
	const outlineIcons = await getIcons('outline');
	const solidIcons = await getIcons('solid')
	const allIcons = [...outlineIcons, ...solidIcons]

	let iconFile = `---
const { customClasses = "", iconStyle = "outline", iconCode="beaker"} = Astro.props
---`;

	await Promise.all(
		allIcons.flatMap(async ({ componentName, svg, type }) => {
			const componentBody = svg.replace("<svg ", "<svg class={customClasses} ")
			const content = `\n
			{iconCode === "${componentName}" && iconStyle === "${type}" && (${componentBody})}`
			iconFile += content;
		})
	)

	fs.writeFile(`astro/Heroicon.astro`, iconFile, 'utf8')
}



async function getIcons(type) {
	let files = await fs.readdir(`./optimized/${type}`)
	return Promise.all(
		files.map(async (file) => ({
			svg: await fs.readFile(`./optimized/${type}/${file}`, 'utf8'),
			componentName: `${file.replace(/\.svg$/, '')}`,
			type
		}))
	)
}


const buildPackage = async () => {
	await rimraf(`./astro/Heroicon.astro`);
	await buildIcons();
}

buildPackage();
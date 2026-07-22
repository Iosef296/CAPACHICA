const { withAppBuildGradle } = require('expo/config-plugins');
const { mergeContents } = require('expo/config-plugins').CodeGenerator;

const TAG = 'capachica-apk-filename';

// Keeps the APK named "Capachica-{app.json expo.version}.apk" after `expo prebuild`
// regenerates android/, since that wipes any manual edit to build.gradle.
module.exports = function withApkFilename(config) {
  return withAppBuildGradle(config, (config) => {
    let contents = config.modResults.contents;

    contents = mergeContents({
      tag: `${TAG}-import`,
      src: contents,
      newSrc: 'import groovy.json.JsonSlurper',
      anchor: /^apply plugin:/,
      offset: 0,
      comment: '//',
    }).contents;

    contents = mergeContents({
      tag: `${TAG}-output`,
      src: contents,
      newSrc: [
        '    def appVersion = new JsonSlurper().parse(new File(rootDir.getAbsoluteFile().getParentFile().getAbsolutePath(), "app.json")).expo.version',
        '',
        '    applicationVariants.all { variant ->',
        '        variant.outputs.all { output ->',
        '            outputFileName = "Capachica-${appVersion}.apk"',
        '        }',
        '    }',
      ].join('\n'),
      anchor: /^android \{/,
      offset: 1,
      comment: '//',
    }).contents;

    config.modResults.contents = contents;
    return config;
  });
};

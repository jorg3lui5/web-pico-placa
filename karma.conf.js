// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-sonarqube-reporter'),
            require('karma-sonarqube-unit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')

        ],
        client: {
            jasmine: {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            dir: require('path').join(__dirname, 'coverage'),
            subdir: '.',
            reporters: [
                { type: 'html', subdir: 'html-report' },
                { type: 'text-summary' },
                { type: 'lcov', subdir: 'lcov-report' }
            ]
        },
        sonarqubeReporter: {
            basePath: 'src/app',
            outputFolder: 'coverage',
            filePattern: '**/*spec.ts',
            encoding: 'utf-8',
            legacyMode: false,
            reportName: 'sonar-report.xml'
        },
        sonarQubeExecutionReporter: {
            sonarQubeVersion: 'LATEST',
            testPaths: ['./src/app'],
            testFilePattern: '.spec.ts',
            outputDir: './coverage',
            outputFile: 'sonar-report.xml'
        },
        reporters: ['progress', 'kjhtml', 'sonarqube'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu']
            }
        },
        singleRun: false,
        restartOnFileChange: true
    });
};
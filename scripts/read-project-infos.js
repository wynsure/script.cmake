const { script, file } = require("@ewam/script.cli")
const { parsePackageName, parsePackageVersion } = require("./internal/utils")
const process = require("process")

script((argv) => {
    const infos = file.read.json(argv.file)
    const name_infos = parsePackageName(infos.name)
    const version_infos = parsePackageVersion(infos.version)
    process.stdout.write(JSON.stringify({
        PROJECT_PACKAGE_FULLNAME: name_infos.fullName,
        PROJECT_PACKAGE_SCOPE: name_infos.scope,
        PROJECT_PACKAGE_NAME: name_infos.name,
        PROJECT_PACKAGE_FULLVERSION: version_infos.fullVersion,
        PROJECT_PACKAGE_VERSION: version_infos.version,
        PROJECT_PACKAGE_PRERELEASE: version_infos.prerelease,
    }, null, 2))
}, {
    "file": {
        type: "string",
        require: true,
    }
})

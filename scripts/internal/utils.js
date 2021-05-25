
module.exports = {
    parsePackageName(fullName) {
        let scope, name, archiveName
        const parts = fullName.split('/')
        if (fullName[0] == '@') scope = parts.shift().slice(1)
        name = parts.join("-")
        archiveName = scope ? `${scope}-${name}` : name
        return { fullName, archiveName, scope, name }
    },
    parsePackageVersion(fullVersion) {
        const version_parts = fullVersion.split("-")
        version = version_parts.shift()
        prerelease = version_parts.join("-")
        return { fullVersion, version, prerelease }
    },
}

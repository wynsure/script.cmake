const { script, command, directory } = require("@ewam/script.cli")

script((argv) => {
  let filter = undefined
  if (argv.filter) {
    const pattern = new RegExp(argv.regex, "i")
    filter = (name) => {
      console.log("check", name, pattern)
      return pattern.test(name)
    }
  }
  for (const source of argv.sources) {
    if (directory.exists(source)) {
      console.log(`copy of directory '${source}' to '${argv.destination}'...`)
      directory.copy(source, argv.destination, filter)
    }
    else {
      console.log(`directory '${source}' not found`)
      command.exit(1)
    }
  }
}, {
  arguments: {
    "regex": {
      type: "string",
      required: true,
    },
    "sources": {
      type: "string",
      isArray: true,
      required: true,
    },
    "destination": {
      type: "string",
      required: true,
    },
  }
})

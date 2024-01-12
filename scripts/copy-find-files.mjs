#!/usr/bin/env node

import { file, script } from "@ewam/script.cli"
import { globSync } from "glob"

script((argv) => {
  const { regex, from, to } = argv

  const foundFiles = globSync(regex, {
    absolute: true,
    cwd: from,
    nodir: true,
    posix: true,
  })

  for (const foundFile of foundFiles) {
    console.log(`copy of "${foundFile}" to "${to}"...`)
    file.copy.toDir(foundFile, to)
  }
}, {
  arguments: {
    regex: {
      type: "string",
      required: true,
    },
    from: {
      type: "string",
      required: true,
    },
    to: {
      type: "string",
      required: true,
    },
  }
})
const { script, command, file } = require("@ewam/script.cli")
const Path = require("path")
const fs = require("fs")
const Process = require("process")


script((argv) => {
  console.log(`copy and sign of '${argv.input}' to '${argv.output}'...`)

  // Copy file
  let outputFile
  if (argv.output) outputFile = file.copy.toFile(argv.input, argv.output)
  else if (argv.destination) outputFile = file.copy.toDir(argv.input, argv.destination)
  else command.exit(-1)

  // Sign file with certificate

  // Take in env variables with this signing information.
  // Certificate for this is inmported in the User certificates
  // The thumbprint allows the tool to find the certificate in the store.
  // For example: 
  // SIGNING_THUMBPRINT=029ef244f2f590dacf91ebff2631118f7ce6014b
  // SIGNING_URL=http://timestamp.digicert.com
  
  let signingThumbPrint, signingURL
  if (Process.env["SIGNING_THUMBPRINT"]) {
    signingThumbPrint = Process.env["SIGNING_THUMBPRINT"]
  }
  if (Process.env["SIGNING_URL"]) {
    signingURL = Process.env["SIGNING_URL"]
  }

  if (signingThumbPrint) {
    // Do real signing based on env variables 
    console.log(`signing from environment variable SIGNING_THUMBPRINT`)
    
    if (signingURL) {
      // signing URL specified 
      command.call(`${__dirname}/signtool/signtool.exe`, [
        "sign",
        "/tr", signingURL,
        "/td", "SHA256",
        "/fd", "SHA256",
        "/sha1", signingThumbPrint,
        "/as", outputFile
      ])
    } else {
      // signing URL not specified 
      command.call(`${__dirname}/signtool/signtool.exe`, [
        "sign",
        "/td", "SHA256",
        "/fd", "SHA256",
        "/sha1", signingThumbPrint,
        "/as", outputFile
      ])
    }
  } else { 
    //  signing based on the self-signed certificate
    const certificate_path = Path.resolve(`${__dirname}/signtool/default-certificate.pfx`)
    const certificate_password = "anyone_password"
    command.call(`${__dirname}/signtool/signtool.exe`, [
      "sign",
      "/f", certificate_path,
      "/p", certificate_password,
      "/fd", "SHA1",
      //"/tr", "http://timestamp.digicert.com",
      "/td", "SHA1",
      "/a", outputFile,
    ])
    command.call(`${__dirname}/signtool/signtool.exe`, [
      "sign",
      "/f", certificate_path,
      "/p", certificate_password,
      "/fd", "SHA256",
      //"/tr", "http://timestamp.digicert.com",
      "/td", "SHA256",
      "/as", outputFile,
    ])
  }

}, {
  arguments: {
    "input": {
      type: "string",
      required: true,
    },
    "output": {
      type: "string",
    },
    "destination": {
      type: "string",
    },
  }
})

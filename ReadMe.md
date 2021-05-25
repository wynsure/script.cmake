This cmake toolkit is made to work with node.js and it package manager

So you shall have a `package.json` at the root of your project:
```json
{
    "name": "{PROJECT_PACKAGE_NAME}",
    "version": "${PROJECT_PACKAGE_VERSION}",
    "devDependencies": {
        "script.cmake": "https://github.com/FlorianLebrun/script.cmake.git"
    }
    ...
}
```

```cmake
cmake_minimum_required(VERSION 3.19)
include(./cmake-toolkit.cmake)

project(${PROJECT_NAME}
  LANGUAGES CXX
  VERSION ${PROJECT_VERSION}
)

```
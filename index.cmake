
# Install node scripts
set(NODE_TOOLS "${CMAKE_SOURCE_DIR}/node_modules/tools")
set(NODE_TOOLS_SCRIPT_DIR "${CMAKE_CURRENT_LIST_DIR}/scripts")
if(NOT EXISTS ${NODE_TOOLS})
execute_process(COMMAND cmd /c npm install WORKING_DIRECTORY ${CMAKE_SOURCE_DIR})
endif()

# Read project infos
include(${CMAKE_CURRENT_LIST_DIR}/package-infos.cmake)

# Add used cmake library
include(${CMAKE_CURRENT_LIST_DIR}/utils.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/sources.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/packaging.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/shared-library.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/NodeJS.cmake)

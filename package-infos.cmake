
# Set main directories variables
set_property(GLOBAL PROPERTY USE_FOLDERS TRUE)
if(NOT DELIVERY_OUTPUT_DIR)
    set(DELIVERY_OUTPUT_DIR ${CMAKE_SOURCE_DIR}/.delivery)
    message(STATUS "Use default delivery directory at '${DELIVERY_OUTPUT_DIR}'")
endif()
if(NOT PROJECT_DEV_DIR)
    set(PROJECT_DEV_DIR ${CMAKE_BINARY_DIR}/.build.dev)
    message(STATUS "Use default development directory at '${PROJECT_DEV_DIR}'")
endif()
get_filename_component(DELIVERY_OUTPUT_DIR ${DELIVERY_OUTPUT_DIR} ABSOLUTE)
get_filename_component(PROJECT_DEV_DIR ${PROJECT_DEV_DIR} ABSOLUTE)

# Check devmode activation
# > devmode ON: improve building time
# > devmode OFF: add signing & improve reliability of building process
if(NOT DEVMODE)
    set(DEVMODE OFF)
else()
    message(STATUS "DEVMODE ON: Will build in developer mode, copy target directly in package & remove signing")
endif()

function(LoadProjectInfosVars)
    execute_process(COMMAND node.exe ${NODE_TOOLS_SCRIPT_DIR}/read-project-infos --file "${CMAKE_SOURCE_DIR}/package.json" OUTPUT_VARIABLE L_infos)
    string(JSON L_infos_last LENGTH ${L_infos})
    math(EXPR L_infos_last ${L_infos_last}-1)
    foreach(L_Index RANGE ${L_infos_last})
        string(JSON CUR_NAME MEMBER ${L_infos} ${L_Index})
        string(JSON CUR_VALUE GET ${L_infos} ${CUR_NAME})
        set(${CUR_NAME} ${CUR_VALUE} PARENT_SCOPE)
    endforeach()
endfunction()

LoadProjectInfosVars()

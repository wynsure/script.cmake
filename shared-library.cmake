
function(add_packaged_shared_library target)
    cmake_parse_arguments(ARG "" "" "SHARED;LIBS;API" ${ARGN})

    # Create library
    add_library(${target} SHARED ${ARG_SHARED})

    # Set compile properties
    target_set_shared_api_macro(${target} API ${ARG_API})

    # Set link properties
    foreach(libname ${ARG_LIBS})
        target_link_libraries(${target} PRIVATE "${libname}")
        target_link_options(${target} PRIVATE "/WHOLEARCHIVE:${libname}.lib")
    endforeach()

    # Export interface of libraries linked inside this shared library
    target_include_directories(${target} INTERFACE $<TARGET_PROPERTY:${target},INCLUDE_DIRECTORIES>)

endfunction()

function(target_set_shared_api_macro target)
    cmake_parse_arguments(ARG "" "" "API;PRIVATE" ${ARGN})
    foreach(apiDef ${ARG_API})
        target_compile_definitions(${target} PRIVATE "${apiDef}=__declspec(dllexport)")
        target_compile_definitions(${target} INTERFACE "${apiDef}=__declspec(dllimport)")
    endforeach()
    foreach(apiDef ${ARG_PRIVATE})
        target_compile_definitions(${target} PRIVATE "${apiDef}=")
    endforeach()
endfunction()

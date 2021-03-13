
function(add_packaged_shared_library target)
    cmake_parse_arguments(ARG "" "API" "SHARED;LIBS" ${ARGN})

    # Create library
    add_library(${target} SHARED ${ARG_SHARED})

    # Set compile properties
    if(ARG_API)
        target_compile_definitions(${target} PRIVATE "${ARG_API}=__declspec(dllexport)")
        target_compile_definitions(${target} INTERFACE "${ARG_API}=__declspec(dllimport)")
    endif()

    # Set link properties
    foreach(libname ${ARG_LIBS})
        target_link_libraries(${target} PRIVATE "${libname}")
        target_link_options(${target} PRIVATE "/WHOLEARCHIVE:${libname}.lib")
    endforeach()

    # Export interface of libraries linked inside this shared library
    target_include_directories(${target} INTERFACE $<TARGET_PROPERTY:${target},INCLUDE_DIRECTORIES>)

endfunction()

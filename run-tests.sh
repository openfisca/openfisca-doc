#!/usr/bin/env sh

build_stdout=$(npm run build)

if [ $? != 0 ]; then
    echo "Build error:"
    echo "$build_stdout"
    exit 1
fi

# Can't use "^warn" because of colorized output.
WARNING_REGEX="warn:"

echo "$build_stdout" | grep --quiet $WARNING_REGEX
if [ $? = 0 ]; then
    echo "Warnings found:"
    echo "$build_stdout" | grep $WARNING_REGEX
    exit 1
fi

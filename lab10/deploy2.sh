#!/bin/bash

echo "Deployment Script for COSC212 project files"

# ensure that the script is run with a parameter consisting a folder
if [ $# -ne 1 ];
then
    # Not exactly one argument
    echo $0 Expects to be run with only one argument
    echo $0 \<project  name\>
    exit
fi

# $SOURCEDIR is where the files are coming from
SOURCEDIR=/devel/$USER/projects/$1

# $TARGETDIR is where the files are going to
TARGETDIR=/web/$USER/projects/$1

# $TEMPDIR is the temporary staging location
TEMPDIR=$TARGETDIR.new

# $BACKUPDIR is where we store a copy of the old site
BACKUPDIR=$TARGETDIR.old

cd $SOURCEDIR

if [ -f manifest ];
then
    # if manifest exists only copy files in manifest
    echo "Found manifest"
    echo "Making" $TEMPDIR
    mkdir $TEMPDIR
    echo "Made" $TEMPDIR
    cp --parents $(cat manifest) $TEMPDIR
else
    # copy file from dev to production
    cp -R $SOURCEDIR $TEMPDIR
fi

if [ -d $TARGETDIR ];
then
    mv $TARGETDIR $BACKUPDIR
fi

mv $TEMPDIR $TARGETDIR

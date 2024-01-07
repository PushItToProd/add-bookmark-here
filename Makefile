.PHONY: run
run:
	web-ext run --devtools

.PHONY: build
build:
	web-ext build --overwrite-dest
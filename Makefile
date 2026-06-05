PORT ?= 8042

run:
	python3 -m http.server $(PORT)

serve: run

.PHONY: run serve

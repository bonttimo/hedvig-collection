export default class designOverlay {
    constructor(obj) {
        this.obj = obj;

        this.initial = this.obj.initial || { opacity: 0.3, fullWidth: false, initial: "visible", active: true };
        this.maxWidth = this.obj.maxWidth || "100%";
        this.backgroundColor = this.obj.backgroundColor || "#080808";
        this.opacity = this.obj.initial.opacity || "0.3";
        this.images = [...obj.images];
        this._htmlContainer = null;

        this.init();

        document.addEventListener("keydown", (event) => {
            const key = this.getKeyCode(event);
            if (event.isComposing || key === "o") {
                !this._htmlContainer.classList.contains("active") ? this.show() : this.hide();
            }
            if (event.isComposing || (key === "f" && this._htmlContainer.classList.contains("active"))) {
                this.fullWidth();
            }
            if (isFinite(key) && this._htmlContainer.classList.contains("active")) {
                this.changeOpacity(key);
            }
        });
    }

    async init() {
        this.injectCss();
        const html = await this.html();
        this.showCorrectImage();

        return html;
    }

    async html() {
        const container = document.createElement("div");
        container.classList.add("design-overlay");
        container.style.position = "absolute";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = !this.initial.active ? "none" : "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "flex-start";
        container.style.alignItems = "center";
        container.style.pointerEvents = "none";
        container.style.zIndex = "99999";
        container.style.top = "0";
        container.style.left = "0";

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("design-overlay-image-container");
        imageContainer.style.maxWidth = this.maxWidth;
        imageContainer.style.width = "100%";
        imageContainer.style.height = "100%";

        container.append(imageContainer);

        if (this.initial.initial === "visible") container.classList.add("active");
        if (!this.initial.active) container.classList.add("not-active");
        if (this.initial.fullWidth) container.classList.add("full-width");

        const addImages = async (images) => {
            const _images = images.map(async ({ image, url }) => {
                return new Promise((resolve, reject) => {
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        const imgContainer = document.createElement("div");
                        imgContainer.classList.add("design-overlay-image");
                        // imgContainer.classList.add(`design-overlay-image-${url.replace(/\//g, "")}`);
                        imgContainer.classList.add(`design-overlay-image-${url}`);
                        imgContainer.dataset.url = url;
                        imgContainer.style.opacity = "0";
                        imgContainer.style.display = "none";

                        tempImg.width = tempImg.naturalWidth;
                        tempImg.height = tempImg.naturalHeight;

                        imgContainer.append(tempImg);
                        resolve(imgContainer);
                    };
                    tempImg.src = image;
                });
            });
            return Promise.all(_images);
        };

        await addImages(Object.values(this.images)).then((images) => {
            images.forEach((img) => imageContainer.append(img));
            this._htmlContainer = container;
        });

        document.body.append(container);
    }

    showCorrectImage() {
        const url = window.location.pathname;
        const overlayImages = this._htmlContainer.querySelectorAll(".design-overlay-image");
        const matches = [];

        for (const [key, value] of Object.entries(overlayImages)) {
            let dataUrl = value.dataset.url;
            let regexp = new RegExp(`${dataUrl}$`);

            if (value.dataset.url.includes("*")) {
                regexp = new RegExp("^" + dataUrl + ".+", "ig");
                dataUrl = dataUrl.replace(/\*/g, "");
                // console.log(`${url} | ${img.dataset.url.replace(/\*/g, "")} | ${regEx}`);
            }

            const found = regexp.test(url);
            if (found) matches.push({ element: value, url: dataUrl });
        }

        matches.forEach((match) => {
            match.element.style.opacity = "1";
            match.element.style.display = "block";
        });
    }

    getKeyCode = (e) => {
        e = e || window.event;
        return e.key;
    };

    show() {
        this._htmlContainer.style.opacity = `${this.opacity}`;
        this._htmlContainer.classList.add("active");

        if (!this.initial.active) {
            this.initial.active = true;
            this._htmlContainer.classList.remove("not-active");
            this._htmlContainer.style.display = `flex`;
        }
    }

    hide() {
        this._htmlContainer.classList.remove("active");
        this._htmlContainer.style.removeProperty("opacity");
    }

    fullWidth() {
        this._htmlContainer.classList.toggle("full-width");
    }

    changeOpacity(value) {
        let _value = parseInt(value);

        if (_value === 0) this._htmlContainer.style.opacity = "1";
        else this._htmlContainer.style.opacity = `${_value / 10}`;
        this.opacity = _value === 0 ? 1 : `${_value / 10}`;
    }

    destroy() {
        this._htmlContainer.remove();
    }

    injectCss() {
        const css = `
            .design-overlay {
                background-color: ${this.backgroundColor};
                opacity: 0;
                transition: all 150ms ease;
            }
            .design-overlay.active {
                opacity: ${this.initial.opacity};
            }
            .design-overlay.full-width .design-overlay-image, .design-overlay.full-width .design-overlay-image-container {
                width: 100%;
                height: auto;
                max-width: 100% !important;
            }
            .design-overlay.full-width img {
                width: 100%;
                height: auto;
            }
        `;
        const style = document.createElement("style");
        style.innerHTML = css;
        document.body.append(style);
    }
}

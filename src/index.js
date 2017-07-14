import { preload, ImageBlur } from './utils';

function blurify (thumbs, options) {

    this.options = typeof options === 'object' ? options : {};

    this.renderOriginalImage = function (img) {
            img.thumb.parentNode.appendChild(img);
            window.getComputedStyle(img).opacity; // we need a paint reflow
            img.thumb.parentNode.className += ' is-image-loaded';
    };

    this.preloadThumbs = function (thumbs) {
        preload(thumbs, this.loadThumbCb);
    };

    this.preloadImages = function (thumbs) {
        if (this.options.waypointsCb && window.Waypoints) {
            this.options.waypointsCb(thumbs);
        } else {
            let images = [];
            for (var i=0;i<thumbs.length;i++) {
                let image = document.createElement('img');
                image.thumb = thumbs[i];
                image.src = thumbs[i].dataset.original;
                images[images.length] = image;
            }
            preload(images, this.loadImageCb);
        }
    };

    this.loadThumbCb = function (thumb) {
        let canvas = document.createElement('canvas');
        thumb.parentNode.insertBefore(canvas,thumb.nextElementSibling);
        ImageBlur(thumb, canvas, this.options.blurRadius, this.options.alphaChannel);
    }.bind(this);

    this.loadImageCb = function (img) {
        this.renderOriginalImage(img);
    }.bind(this);

    // run
    this.preloadThumbs(thumbs);
    this.preloadImages(thumbs);
}

export default blurify;
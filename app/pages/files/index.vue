<script setup>
    import VueEasyLightbox from 'vue-easy-lightbox'
    import { ref } from 'vue'

    // async function optimizeImage(file, {
    //     maxWidth = 1280,
    //     maxHeight = 1280,
    //     quality = 0.6,
    //     preferType = "image/webp" // try 'image/avif' if your backend accepts it
    // } = {}) {
    //     const imgUrl = URL.createObjectURL(file);

    //     let bitmap;
        
    //     try {
    //         // createImageBitmap is fast and respects EXIF orientation in most browsers
    //         bitmap = await createImageBitmap(await (await fetch(imgUrl)).blob());
    //     } catch {
    //         // Fallback via HTMLImageElement
    //         bitmap = await new Promise((resolve, reject) => {
    //             const img = new Image();
    //             img.onload = () => resolve(img);
    //             img.onerror = reject;
    //             img.src = imgUrl;
    //         });
    //     }

    //     // 2) Compute target size (fit within maxWidth x maxHeight)
    //     let { width, height } = bitmap;
    //     const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    //     const targetW = Math.round(width * ratio);
    //     const targetH = Math.round(height * ratio);

    //     // 3) Draw onto canvas (use OffscreenCanvas if you like)
    //     const canvas = document.createElement("canvas");
    //     canvas.width = targetW;
    //     canvas.height = targetH;

    //     const ctx = canvas.getContext("2d");

    //     // Slightly better quality scaling
    //     ctx.imageSmoothingEnabled = true;
    //     ctx.imageSmoothingQuality = "high";
    //     ctx.drawImage(bitmap, 0, 0, targetW, targetH);

    //     // 4) Export with quality. Try WebP, fallback to JPEG.
    //     const blob = await new Promise((resolve) => {
    //         // Try preferred type
    //         canvas.toBlob(
    //             (b) => {
    //                 if (b) return resolve(b);
    //                 // Fallback to JPEG if preferred type not supported
    //                 canvas.toBlob((b2) => resolve(b2), "image/webp", quality);
    //             },
    //             preferType,
    //             quality
    //         );
    //     });

    //     URL.revokeObjectURL(imgUrl);
    //     return blob;
    // }

    async function optimizeImageByPercent(file, {
        scale = null,    
        scaleX = null,       
        scaleY = null,       
        quality = 0.6,
        preferType = "image/webp" // try "image/avif" if your backend supports it
    } = {}) {
        if (!file) return;

        // Normalize scales
        const norm = v => (v == null ? null : (v > 1 ? v / 100 : v));
        let s  = norm(scale);
        let sx = norm(scaleX);
        let sy = norm(scaleY);

        // Decide final sx, sy
        if (s == null && sx == null && sy == null) {
            s = 1;
        }
        if (s != null) {
            sx = s;
            sy = s;
        } else {
            sx = sx == null ? 1 : sx;
            sy = sy == null ? 1 : sy;
        }

        if (sx <= 0 || sy <= 0) throw new Error("Scale values must be > 0");

        const imgUrl = URL.createObjectURL(file);
        let bitmap;

        try {
            bitmap = await createImageBitmap(await (await fetch(imgUrl)).blob());
        } catch {
            bitmap = await new Promise((resolve, reject) => {
            const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = imgUrl;
            });
        }

        const sourceW = bitmap.width;
        const sourceH = bitmap.height;

        const targetW = Math.max(1, Math.round(sourceW * sx));
        const targetH = Math.max(1, Math.round(sourceH * sy));

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;

        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bitmap, 0, 0, targetW, targetH);

        const blob = await new Promise(resolve => {
            canvas.toBlob(
                b => {
                    if (b) return resolve(b);
                    canvas.toBlob(b2 => resolve(b2), "image/jpeg", quality);
                },
                preferType,
                quality
            );
        });

        URL.revokeObjectURL(imgUrl);
        return blob      
    }

    const previewUrls = ref([]);
    const originalSize = ref([]);
    const optimizedSize = ref([]);
    const optimizedBlob = ref(null);

    function humanSize(bytes) {
        if (!bytes) return "0 B";
        const units = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
    }

    async function onPick(e) {
        const file = e.target?.files;
        console.log(e.target?.files[0])
        if (!file) return;

        for(let i=0; i<file.length; i++){
            originalSize.value.push(file[i].size);

            // You can tune these numbers
            optimizedBlob.value = await optimizeImageByPercent(file[i], { 
                scale: 1, quality: 0.7, 
                preferType: file[i].type
            });

            optimizedSize.value.push(optimizedBlob.value?.size || 0);

            previewUrls.value.push(URL.createObjectURL(optimizedBlob.value));
        }
    }

    // async function handleSubmit() {
    //     if (!optimizedBlob.value) return;

    //     uploading.value = true;
    //     try {
    //         const form = new FormData();
    //         // Pass a filename; use .webp or .jpg depending on blob.type
    //         const ext = optimizedBlob.value.type.includes("webp") ? "webp" : "jpg";
    //         form.append("file", optimizedBlob.value, `photo.${ext}`);

    //         // Replace with your endpoint
    //         // await fetch("/api/upload", {
    //         //   method: "POST",
    //         //   body: form
    //         //   // headers not needed for multipart; browser sets boundary
    //         // });

    //         alert("Uploaded!", previewUrls.value);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Upload failed");
    //     } finally {
    //         uploading.value = false;
    //     }
    // }
    const visibleRef = ref(false)
    const indexRef = ref(0)

    const showImg = (index) => {
        indexRef.value = index
        visibleRef.value = true
    }

    const onHide=()=>{
        visibleRef.value = false
    }
</script>

<template>
    <input name="fileupload" type="file" accept="image/*" class="border-2 p-4 rounded-[5px]" @change="onPick" />

    <div v-if="previewUrls.length>0" class="flex flex-wrap mt-1.5 gap-3.5">
        <div v-for="(url, index) in previewUrls" @click="()=>showImg(index)" :key="index" class="border-2 p-1.5 rounded-[10px] items-center w-[250px] h-auto">
            <img :src="url" alt="preview" style="width:100%;height:auto" />
            
            <p>before: {{ humanSize(originalSize[index]) }} → now: {{ humanSize(optimizedSize[index]) }}</p>
        </div>
        <div>
            <vue-easy-lightbox
                :visible="visibleRef" :imgs="previewUrls" 
                :index="indexRef" @hide="onHide"
            ></vue-easy-lightbox>
        </div>
    </div>
</template>
import "./Gallery.css"

type GalleryProps = {
    title: string;
    images: string[];
};

export const Gallery: React.FC<GalleryProps> = ({ title, images }) => {
    return (
        <>
            <h1>{title}</h1>
            <div className="gallery">
                {images}
            </div>
        </>
    )
}

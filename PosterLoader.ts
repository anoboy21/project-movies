
//TODO: add a placeholder case
//TODO: Figure out width handling
/**
 * 
 * @param src - File name of the poster
 * @param width - The desired Width. Currently unused, WIP
 * @returns 
 */
export const PosterLoader = ({src, width}: {src: string, width: number}) => {
    return `https://image.tmdb.org/t/p/w500/${src}`;
}
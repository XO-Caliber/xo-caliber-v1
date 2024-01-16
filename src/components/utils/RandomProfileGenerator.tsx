export const getRandomImageUrl = () => {
  const imageList = [
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNTEtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctMTUyLWFuaW1hbGljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctMTU0LWFuaW1hbGljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctMTU2LWFuaW1hbGljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNTItYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctMTQ2LWFuaW1hbGljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctOTEtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNTQtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNTYtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNTUtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctODgtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctODctYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctODktYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNjEtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctNjAtYW5pbWFsLWljb25zXzIuanBn.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctODItYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctODctYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctODYtYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctODgtYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctNDYtYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MWJhdGNoMi1hZXctOTYtYW5pbWFsaWNvbnNfMi5qcGc.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctMTQ2LWFuaW1hbC1pY29uc18yLmpwZw.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctMTQ3LWFuaW1hbC1pY29uc18yLmpwZw.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctMTUzLWFuaW1hbC1pY29uc18yLmpwZw.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM0MS1hZXctMTU0LWFuaW1hbC1pY29uc18yLmpwZw.jpg"
  ];

  const randomIndex = Math.floor(Math.random() * imageList.length);
  return imageList[randomIndex];
};

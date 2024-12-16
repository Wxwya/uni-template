const vconsoleMd5 = '47b1e3a9d33e6064e58cc4796c708447'
export default async () => {
  // #ifdef H5
  // const url = new URL(location.href)
  // const searchParams = new URLSearchParams(url.search)
  // const vconsole = searchParams.get('vconsole')
  // console.log(vconsole);
  // if (vconsole == vconsoleMd5) {
    const module: any = await import("vconsole");
    const Vconsole = module.default;
     new Vconsole();
  // }
  // #endif
}

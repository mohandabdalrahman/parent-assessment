export class Utilities {
  static reloadComponent(router: {
    url: any;
    navigateByUrl: (arg0: string, arg1: { skipLocationChange: boolean; }) => Promise<any>;
    navigate: (arg0: string[]) => Promise<any>;
  }) {
    const url = router.url;
    router.navigateByUrl('/app', {skipLocationChange: true}).then(() => {
      router.navigate([`/${url}`]).then(() => {
      })
    })
  }

}

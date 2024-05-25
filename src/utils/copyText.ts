export const copyText = ({text, setCopied} : any) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };
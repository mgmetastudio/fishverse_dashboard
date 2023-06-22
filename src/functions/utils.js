export function clearLocalStorage(){
    const fields = ['accessToken', 'refreshToken', 'metamask', 'items', 'username', 'email',
        'telegram', 'avatar', 'joined', 'guild', 'twitter', 'discord', 'isWalletConnected',
        'connectedWallet', 'daily_login_streak'];

    for(const f of fields) {
        localStorage.removeItem(f);
    }
}

export function isWalletMerged(){
    const metamask = localStorage.getItem("metamask") ?? ""
    return metamask && metamask.length === 42
}

export function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
  }
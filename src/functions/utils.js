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
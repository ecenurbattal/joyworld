export const exchangeEnum = Object.freeze({
    WAITING: 'BEKLİYOR',
    ACCEPTED: 'KABUL EDİLDİ',
    DENIED: 'REDDEDİLDİ',
    COMPLETED: 'TAMAMLANDI',
    FAILED: 'TAMAMLANAMADI',
});


export const orderEnum = Object.freeze({
    STILL_PROGRESS: 'DEVAM EDİYOR',
    COMPLETED: 'TAMAMLANDI',
    FAILED: 'TAMAMLANAMADI',
})

export const paymentEnum = Object.freeze({
    IYZICO: 'IYZICO',
    EXTERNAL:'HARİCİ'
})
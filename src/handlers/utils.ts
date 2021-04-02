import fetch from 'node-fetch';

export default async function checkVendor (token: string): Promise<boolean> {
    return await fetch(process.env.SERVICES + `/dev/users/vendors/check/${token}`)
        .then(async responseUser => {
            return responseUser.status == 200;
        })
        .catch(error => {
            return false;
        })
}
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const s3BucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EPIRATION

export class AttachmentUtils {
    constructor (
        private readonly bucketS3 = new XAWS.S3({signatureVersion: 'v4'}),
        private readonly bucketName = s3BucketName
    ) {}

    getAttachmentUrl(fieldId: string) {
        return `https://${this.bucketName}.s3.amazonaws.com/${fieldId}`
    }

    getUploadUrl(fieldId: string) {
        const url = this.bucketS3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: fieldId,
            Expires: urlExpiration
        })
        return url as string
    }

}
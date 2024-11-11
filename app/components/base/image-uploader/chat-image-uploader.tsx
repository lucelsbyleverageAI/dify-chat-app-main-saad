import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import Uploader from './uploader'
import ImageLinkInput from './image-link-input'
import ImagePlus from '@/app/components/base/icons/line/image-plus'
import { TransferMethod } from '@/types/app'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import Upload03 from '@/app/components/base/icons/line/upload-03'
import type { ImageFile, VisionSettings } from '@/types/app'

type UploadOnlyFromLocalProps = {
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
  limit?: number
}
const UploadOnlyFromLocal: FC<UploadOnlyFromLocalProps> = ({
  onUpload,
  disabled,
  limit,
}) => {
  return (
    <div className="">
      <Uploader onUpload={onUpload} disabled={disabled} limit={limit}>
        {
          hovering => (
            <div className={`${s.customIcon} 
              relative flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer
              ${hovering && 'bg-gray-100'}
            `}>
              <ImagePlus className='flex w-4 h-4 text-gray-500 mt-3' />
            </div>
          )
        }
      </Uploader>
    </div>
  )
}

type UploaderButtonProps = {
  methods: VisionSettings['transfer_methods']
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
  limit?: number
}
const UploaderButton: FC<UploaderButtonProps> = ({
  methods,
  onUpload,
  disabled,
  limit,
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const hasUploadFromLocal = methods.find(method => method === TransferMethod.local_file)

  const handleUpload = (imageFile: ImageFile) => {
    setOpen(false)
    onUpload(imageFile)
  }

  const handleToggle = () => {
    if (disabled)
      return

    setOpen(v => !v)
  }

  return (

    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='top-start'
    >

      <PortalToFollowElemTrigger onClick={handleToggle}>
        <div className={`${s.ChatImg} 
        relative flex items-center justify-center w-8 h-8 rounded-lg
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}>
          <ImagePlus className='w-4 h-4 text-gray-500' />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className='z-50 border-[0.5px] border-gray-200'>
        <div className=' p-2 w-[350px] bg-white rounded-lg border-[0.5px] border-gray-200 shadow-lg'>
          <ImageLinkInput onUpload={handleUpload} />
          {
            hasUploadFromLocal && (
              <>
                <div className='flex items-center mt-2 px-2 text-xs font-medium text-gray-400'>
                  <div className='flex-grow mr-3 w-[93px] h-[1px] bg-gradient-to-l from-[#F3F4F6]' />
                  OR
                  <div className='flex-grow ml-3 w-[93px] h-[1px] bg-gradient-to-r from-[#F3F4F6]' />
                </div>
                <Uploader onUpload={handleUpload} limit={limit}>
                  {
                    hovering => (
                      <div className={`
                        flex items-center justify-center h-8 text-[13px] font-medium  rounded-lg cursor-pointer
                        ${hovering && 'bg-primary-50'}
                      `}>
                        <Upload03 className='mr-1 w-4 h-4' />
                        {t('common.imageUploader.uploadFromComputer')}
                      </div>
                    )
                  }
                </Uploader>
              </>
            )
          }
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem >
  )
}

type ChatImageUploaderProps = {
  settings: VisionSettings
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
}
const ChatImageUploader: FC<ChatImageUploaderProps> = ({
  settings,
  onUpload,
  disabled,
}) => {
  const onlyUploadLocal = settings.transfer_methods.length === 1 && settings.transfer_methods[0] === TransferMethod.local_file

  if (onlyUploadLocal) {
    return (
      <UploadOnlyFromLocal
        onUpload={onUpload}
        disabled={disabled}
        limit={+settings.image_file_size_limit!}
      />
    )
  }

  return (
    <div className="">
      <UploaderButton
        methods={settings.transfer_methods}
        onUpload={onUpload}
        disabled={disabled}
        limit={+settings.image_file_size_limit!}
      />
    </div>
  )
}

export default ChatImageUploader

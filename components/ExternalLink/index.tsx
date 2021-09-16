import React, { FC, HTMLProps } from 'react'
import { classNames } from '../../functions/classNames'

const COLOR = {
    default: 'text-primary hover:text-high-emphesis focus:text-high-emphesis',
    blue: 'text-blue opacity-80 hover:opacity-100 focus:opacity-100',
}

interface ExternalLinkProps extends Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> {
    href: string
    startIcon?: JSX.Element
    endIcon?: JSX.Element
}

const ExternalLink: FC<ExternalLinkProps> = ({
    target = '_blank',
    href,
    children,
    rel = 'noopener noreferrer',
    className = '',
    color = 'default',
    startIcon = undefined,
    endIcon = undefined,
    ...rest
}) => {
    return (
        <a
            target={target}
            rel={rel}
            href={href}
            className={classNames(
                'text-baseline whitespace-nowrap',
                COLOR[color],
                (startIcon || endIcon) && 'space-x-1 flex items-center justify-center',
                className
            )}
            {...rest}
        >
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
        </a>
    )
}

export default ExternalLink

import React from "react";

export interface AvatarProps {
    className?: string;
    name?: string;
    image?: string;
    round?: string | boolean;
    size?: string;
    color?: string;
    bgColor?: string;
    alt?: string;
}


export default function Avatar(props: AvatarProps) {

    const getInitials = (name: string) => {
        let initials = name.match(/\b\w/g) || [];
        let ret = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return ret;
    }

    const renderAsImage = () => {
        const imageStyle = {
            maxWidth: '100%',
            width: (props.size ?? ''),
            height: (props.size ?? ''),
            color: (props.color ?? ''),
            background: (props.bgColor ?? ''),
            borderRadius: (props.round === void 0 ? '' : (props.round === true ? '100%' : (props.round === false) ? '' : props.round)),
            objectFit: 'cover'
        } as React.CSSProperties;
        return (
            <img className={props.className + ' avatar--image'}
                 width={props.size}
                 height={props.size}
                 style={imageStyle}
                 src={props.image}
                 alt={props.alt || props.name}/>
        );
    };

    const renderAsText = () => {
        const initials = getInitials(props.name);
        const initialsStyle = {
            width: (props.size ?? ''),
            height: (props.size ?? ''),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: (props.round === void 0 ? '' : (props.round === true ? '100%' : (props.round === false) ? '' : props.round))
        } as React.CSSProperties;
        const spanStyle = {
            fontSize: (props.size !== void 0 ? `calc(${props.size}/2)` : '')
        }
        return (
            <div className={props.className + ' avatar--text'}
                 style={initialsStyle}>
                  <span style={spanStyle}>
                      {initials}
                  </span>
            </div>
        );
    }
    if (props.name) {
        return renderAsText();
    } else if (props.image) {
        return renderAsImage();
    }
    return null;
}

Avatar.defaultProps = {
    className: '',
    round: true
}
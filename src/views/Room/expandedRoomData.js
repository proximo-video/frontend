export function DropdownOption(prefixIcon, label,  onClick, onClickArgument) {
    // this.onPrefixIcon = onPrefixIcon;
    // this.offPrefixIcon = offPrefixIcon;
    // this.onLabel = onLabel;
    // this.offLabel = offLabel;
    this.prefixIcon = prefixIcon;
    this.label = label;
    this.onClick = onClick;
    this.onClickArgument = onClickArgument;
}

// export const optionsMenu = [
//     new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
//     new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
// ]
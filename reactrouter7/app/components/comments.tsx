import React from 'react';
// import {type DisqusThreadProps} from "react-disqus-comments";
// import ReactDisqusComments from "react-disqus-comments";
import {FaLock} from "@react-icons/all-files/fa/FaLock";

// export function Comments(props: DisqusThreadProps) {
export function Comments(props) {
    return <p><FaLock /> Comments temporarily disabled because <a href="https://disqus.com/" target="_blank">Disqus</a> started showing ads (and rough ones). I'll have to migrate the commenting system.</p>

    // return <ReactDisqusComments {...props} />
}
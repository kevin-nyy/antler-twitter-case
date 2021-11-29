import { css } from 'emotion';
// import LoginForm from './components/LoginForm';

import { Form, Input, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input


const styles = {
  container: css({
    // width: '600px',
    // margin: '20px auto',
  }),
  // card: css({
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  // }),
}

interface ComposerProps {
  form: FormInstance;
}

const Composer = (props: ComposerProps) =>  {
  const { form } = props;
  const DEFAULT_TWEET_LENGTH = 140;
  const [remainder, setRemainder] = useState<number>(DEFAULT_TWEET_LENGTH);

  const onTweetChanged = (evt: any) => {
    console.log(evt);
    // form.setFieldsValue({
    //   msg: evt?.target?.value || '',
    // });
    //   return 140 - 23 - (this.state.text.length);
    // } else {
    //     return 140 - (this.state.text.length);
    //   }
    setRemainder(DEFAULT_TWEET_LENGTH);
  };

  const onTweetSubmit = () => {

  };

  const onMediaAdded = () => {

  }

  // useEffect(() => {
  //   form.setFields([{name: 'msg'}]);
  // }, [])

  return (
    <div className={styles.container}>
      {/* {this.overflowAlert() } */}
      <div>
      <Form.Item
          noStyle name="msg">
        <TextArea rows={4} onChange={onTweetChanged} className="form-control"></TextArea>
        </Form.Item>
        <br />
        <span>{remainder}</span>
        {/* <button onClick={onMediaAdded} className="btn btn-default pull-right">{true ? '✓ Photo Added' : 'Add Photo'}</button> */}
        {/* <button className="btn btn-primary pull-right" disabled={remainder === 140 || remainder < 0}>Tweet</button> */}
      </div>
    </div>
  )
}
export default Composer;






	// overflowAlert () {

	// 	if (this.remainingChar() < 0) {
	//   		let beforeOverflowText;
	// 			let overflowText;

	// 		if (this.state.addPhotoStatus) {
	// 			console.log('ppkk');
	// 			beforeOverflowText = this.state.text.substring(140 - 10 - 23, 140 -23);
	// 			overflowText = this.state.text.substring(140 - 23);
	// 		} else {
	// 			console.log('kjhf');
	// 		 	beforeOverflowText = this.state.text.substring(140 - 10, 140);
	// 			overflowText = this.state.text.substring(140);
	// 		}

	// 		return (

	// 			// console.log('before: ' + beforeOverflowText);
	// 		 <div className="alert alert-warning">
  //       <strong>Oops! Too Long:</strong>
	// 				&nbsp;...{beforeOverflowText} 
	// 				<strong>{overflowText}</strong>
  //     </div>
	// 		);
	// 	}
	// }
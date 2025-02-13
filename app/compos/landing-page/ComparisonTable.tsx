import {ReactElement} from "react";
import Image from "next/image";
import CheckBoxIcon from '@/public/icons/checkbox-circle-fill.svg'
import CloseBoxIcon from '@/public/icons/close-circle-fill.svg'

export default function LandingPageComparisonTable(): ReactElement<any> {
    return <div className={'comparisonTable'}>
        <table>
            <thead>
            <tr>
                <th>Features</th>
                <th>Readnotes</th>
                <th>Readwise</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>Unlimited FREE Learn mode</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>
                </td>
                <td>
                  <span>
                    <Image src={CloseBoxIcon} alt={'unavailable'}/>
                  </span>
                </td>
            </tr>
            <tr>
                <td>Unlimited FREE Practice tests</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            <tr>
                <td>Upload Kindle highlight files</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            <tr>
                <td>AI Accessibility for a better learning</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            <tr>
                <td>Discover & Share other people's Notecards</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            <tr>
                <td>Spaced Repetition Mode</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            <tr>
                <td>Make your own flashcards</td>
                <td>
                    <span><Image src={CheckBoxIcon} alt={'available'}/></span>

                </td>
                <td>
          <span>
                <Image src={CloseBoxIcon} alt={'unavailable'}/>
          </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

}
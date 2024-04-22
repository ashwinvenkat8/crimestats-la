import './Table.css';

export default function Table({ data }) {
    return (
        <table className="incidents-table">
            <thead>
                <tr>
                    <th>Dr No</th>
                    <th>Date Reported</th>
                    <th>Date Occurred</th>
                    <th>Time Occurred</th>
                    <th>Status</th>
                    <th>Crime</th>
                    <th>Premise</th>
                    <th>Weapon</th>
                    <th>MO</th>
                    <th>Location</th>
                    <th>Victim</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                </tr>
            </tbody>
        </table>
    );
}
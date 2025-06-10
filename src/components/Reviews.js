import React, { useEffect, useState } from "react";
import { List, Card, Rate, Spin } from "antd";
import { reviewsService } from "../services/reviews";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await reviewsService.getGood();
                setReviews(result);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h1>Customer Reviews</h1>
            {loading ? (
                <Spin />
            ) : (
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={reviews}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={`${item.car.make} ${item.car.model}`}>
                                <Rate disabled value={item.rating} />
                                <p style={{ marginTop: 8 }}>{item.comment}</p>
                                <small>{new Date(item.reviewDate).toLocaleDateString()}</small>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
}

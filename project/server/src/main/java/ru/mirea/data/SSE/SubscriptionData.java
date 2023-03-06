package ru.mirea.data.SSE;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.FluxSink;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SubscriptionData {

    private String login;

    private TypesConnect type;

    private String podType;

    private FluxSink<ServerSentEvent> fluxSink;

    public SubscriptionData(FluxSink<ServerSentEvent> fluxSink) {
        this.fluxSink = fluxSink;
    }
}